using System;
using System.Linq;
using AudioStorage.Data;
using AudioStorage.Services.Interfaces;

namespace AudioStorage.Services;

public class TokenService : ITokenService
{
    private readonly AppDbContext _context;
    public TokenService(AppDbContext context)
    {
        _context = context;
    }
    public RefreshToken? ValidateRefreshToken(string token)
    {
        var tokenData = _context.RefreshTokens.FirstOrDefault(t => t.Token == token);
        if (tokenData != null && DateTime.Now < tokenData.TokenExpires)
        {
            return tokenData;
        }
        else if (tokenData != null)
        {
            RemoveRefreshToken(token);
        }
        return null;
    }

    public void SetRefreshToken(int userId, RefreshToken refreshToken)
    {
        var token = _context.RefreshTokens.FirstOrDefault(t => t.UserId == userId);
        if (token != null)
        {
            token.Token = refreshToken.Token;
            token.TimeCreated = refreshToken.TimeCreated;
            token.TokenExpires = refreshToken.TokenExpires;
        }
        else
        {
            _context.RefreshTokens.Add(refreshToken);
        }
        _context.SaveChanges();
    }

    public void RemoveRefreshToken(string token)
    {
        _context.RefreshTokens.Remove(_context.RefreshTokens.FirstOrDefault(t => t.Token == token)!);
        _context.SaveChanges();
    }
}
