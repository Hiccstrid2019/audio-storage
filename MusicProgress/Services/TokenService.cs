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
    public RefreshToken GetRefreshToken(int userId)
    {
        return _context.RefreshTokens.SingleOrDefault(t => t.UserId == userId);
    }

    public void SetRefreshToken(RefreshToken refreshToken)
    {
        _context.RefreshTokens.Add(refreshToken);
        _context.SaveChanges();
    }
}