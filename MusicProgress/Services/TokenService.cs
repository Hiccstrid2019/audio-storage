using MusicProgress.Data;
using MusicProgress.Services.Interfaces;
using System.Linq;

namespace MusicProgress.Services;

public class TokenService : ITokenService
{
    private readonly AppDbContext _context;
    public TokenService(AppDbContext context)
    {
        _context = context;
    }
    public int? GetUserIdByToken(string token)
    {
        return _context.RefreshTokens.SingleOrDefault(t => t.Token == token)?.UserId;
    }

    public void SetRefreshToken(RefreshToken refreshToken)
    {
        _context.RefreshTokens.Add(refreshToken);
        _context.SaveChanges();
    }

    public void RemoveRefreshToken(string token)
    {
        _context.RefreshTokens.Remove(_context.RefreshTokens.FirstOrDefault(t => t.Token == token)!);
        _context.SaveChanges();
    }
}