﻿using System;
using System.Security.Cryptography;
using System.Threading.Tasks;
using AudioStorage.Data;
using AudioStorage.Models;
using AudioStorage.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AudioStorage.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;
        private readonly ITokenService _tokenService;
        public AuthController(IUserService service, IAuthService authService, ITokenService tokenService)
        {
            _userService = service;
            _authService = authService;
            _tokenService = tokenService;
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<LoginResult>> Register(RegisterModel model)
        {
            var emailUniq = await _userService.IsEmailUniqAsync(model.Email);
            if (!emailUniq)
                return BadRequest(new {message = "user with this email already exists"});
            var hashedPassword = _authService.HashPassword(model.Password);

            var token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
            var user = new User
            {
                Email = model.Email,
                UserName = model.Username,
                HashedPassword = hashedPassword,
            };
            HttpContext.Response.Cookies.Append("refreshToken", token,
                new CookieOptions()
                {
                    HttpOnly = true,
                    Expires = DateTime.Now.AddDays(7),
                    SameSite = SameSiteMode.None,
                    Secure = true
                });
            var userId = await _userService.CreateUserAsync(user);
            _tokenService.SetRefreshToken(userId, new RefreshToken()
            {
                UserId = userId,
                Token = token,
                TimeCreated = DateTime.Now,
                TokenExpires = DateTime.Now.AddDays(7)
            });

            return new LoginResult()
            {
                AuthData = _authService.GetToken(user.UserId),
                UserInfo = new UserInfo() {Name = user.UserName}
            };
        }

        [HttpPost("[action]")]
        public async Task<ActionResult<LoginResult>> Login(LoginModel model)
        {
            var user = await _userService.GetByEmailAsync(model.Email);
            if (user == null)
                return NotFound(new { message = "there is no user with this email"});
            var validPassword = _authService.VerifyPassword(model.Password, user.HashedPassword);
            if (!validPassword)
            {
                return BadRequest(new { message = "invalid password"});
            }

            var token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
            HttpContext.Response.Cookies.Append("refreshToken", token,
                new CookieOptions()
                {
                    HttpOnly = true,
                    Expires = DateTime.Now.AddDays(30),
                    SameSite = SameSiteMode.None,
                    Secure = true
                });
            _tokenService.SetRefreshToken(user.UserId, new RefreshToken()
            {
                UserId = user.UserId,
                Token = token,
                TimeCreated = DateTime.Now,
                TokenExpires = DateTime.Now.AddDays(30)
            });

            return new LoginResult()
            {
                AuthData = _authService.GetToken(user.UserId),
                UserInfo = new UserInfo() {Name = user.UserName}
            };
        }

        [HttpGet("refresh-token")]
        public async Task<ActionResult<LoginResult>> RefreshToken()
        {
            var refreshToken = HttpContext.Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return Unauthorized("Are not refresh token");
            }
            var tokenData = _tokenService.ValidateRefreshToken(refreshToken);
            if (tokenData == null)
            {
                return Unauthorized("Token are expired");
            }

            var user = await _userService.GetByIdAsync(tokenData.UserId);
            var token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64));
            HttpContext.Response.Cookies.Append("refreshToken", token,
                new CookieOptions()
                {
                    HttpOnly = true,
                    Expires = DateTime.Now.AddDays(30),
                    SameSite = SameSiteMode.None,
                    Secure = true
                });
            _tokenService.SetRefreshToken(user.UserId, new RefreshToken()
            {
                UserId = user.UserId,
                Token = token,
                TimeCreated = DateTime.Now,
                TokenExpires = DateTime.Now.AddDays(30)
            });
            return new LoginResult()
            {
                AuthData = _authService.GetToken(user.UserId),
                UserInfo = new UserInfo() {Name = user.UserName}
            };
        }

        [Authorize]
        [HttpGet("[action]")]
        public IActionResult LogOut()
        {
            var token = HttpContext.Request.Cookies["refreshToken"];
            _tokenService.RemoveRefreshToken(token);
            HttpContext.Response.Cookies.Delete("refreshToken");
            return Ok();
        }
    }
}
