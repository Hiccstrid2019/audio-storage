using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using AudioStorage.Data;
using AudioStorage.Options;
using AudioStorage.Services.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace AudioStorage.Services;

public class AuthService : IAuthService
{
    private readonly JwtSettings _jwtSettings;
    
    public AuthService(IOptions<JwtSettings> options)
    {
        _jwtSettings = options.Value;
    }
    public string HashPassword(string password)
    {
        byte[] salt;
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt = new byte[16]);
        }

        var pbkf2 = new Rfc2898DeriveBytes(password, salt, 1000);
        byte[] hash = pbkf2.GetBytes(20);

        byte[] hashBytes = new byte[36];
        Array.Copy(salt, 0, hashBytes, 0, 16);
        Array.Copy(hash, 0, hashBytes, 16, 20);
        
        return Convert.ToBase64String(hashBytes);
    }

    public bool VerifyPassword(string currentPassword, string hashedPassword)
    {
        byte[] hashBytes = Convert.FromBase64String(hashedPassword);

        byte[] salt = new byte[16];
        Array.Copy(hashBytes, 0, salt, 0, 16);
        var pbkf2 = new Rfc2898DeriveBytes(currentPassword, salt, 1000);
        byte[] hash = pbkf2.GetBytes(20);
        for (int i = 0; i < 20; i++)
            if (hashBytes[i + 16] != hash[i])
                return false;
        return true;
    }

    public AuthData GetToken(int id)
    {
        var expirationTime = DateTime.UtcNow.AddSeconds(_jwtSettings.LifeSpan);

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
        var signInCred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var tokenDescription = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, id.ToString())
            }),
            Expires = expirationTime,
            SigningCredentials = signInCred
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescription));
        return new AuthData()
        {
            AccessToken = token
        };
    }
}