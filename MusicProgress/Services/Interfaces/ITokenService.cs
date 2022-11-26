using MusicProgress.Data;

namespace MusicProgress.Services.Interfaces;

public interface ITokenService
{
    RefreshToken GetRefreshToken(int userId);
    void SetRefreshToken(RefreshToken token);
}