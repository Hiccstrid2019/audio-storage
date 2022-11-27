using MusicProgress.Data;

namespace MusicProgress.Services.Interfaces;

public interface ITokenService
{
    int? GetUserIdByToken(string token);
    void SetRefreshToken(RefreshToken token);
    void RemoveRefreshToken(string token);
}