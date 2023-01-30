using AudioStorage.Data;

namespace AudioStorage.Services.Interfaces;

public interface ITokenService
{
    RefreshToken? ValidateRefreshToken(string token);
    void SetRefreshToken(int userId, RefreshToken token);
    void RemoveRefreshToken(string token);
}
