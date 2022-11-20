using Microsoft.AspNetCore.Mvc;
using MusicProgress.Data;
using MusicProgress.Models;
using MusicProgress.Services.Interfaces;

namespace MusicProgress.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthService _authService;
        public AuthController(IUserService service, IAuthService authService)
        {
            _userService = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<AuthData> Register(RegisterModel model)
        {
            var emailUniq = _userService.IsEmailUniq(model.Email);
            if (!emailUniq)
                return BadRequest(new {email = "email already exists"});
            var hashedPassword = _authService.HashPassword(model.Password);
            var userId = _userService.CreateUser(model.Username, model.Email, hashedPassword);
            return _authService.GetToken(userId);
        }

        [HttpPost]
        public ActionResult<AuthData> Login(LoginModel model)
        {
            var user = _userService.GetByEmail(model.Email);
            if (user == null)
                return NotFound(new { email = "no user with this email"});
            var validPassword = _authService.VerifyPassword(model.Password, user.HashedPassword);
            if (!validPassword)
            {
                return BadRequest(new { password = "invalid password"});
            }

            return _authService.GetToken(user.UserId);
        }
    }
}