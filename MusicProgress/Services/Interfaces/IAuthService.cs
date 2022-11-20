using MusicProgress.Data;

namespace MusicProgress.Services.Interfaces
{
    public interface IAuthService
    {
        string HashPassword(string password);
        bool VerifyPassword(string currentPassword, string hashedPassword);
        AuthData GetToken(int id);
    }
}