using MusicProgress.Data;

namespace MusicProgress.Services.Interfaces;

public interface ITokenService
{
    RefreshToken? ValidateRefreshToken(string token);
    void SetRefreshToken(int userId, RefreshToken token);
    void RemoveRefreshToken(string token);
}
