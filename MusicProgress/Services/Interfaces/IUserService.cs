using MusicProgress.Data;

namespace MusicProgress.Services.Interfaces
{
    public interface IUserService
    {
        int CreateUser(string username, string email, string hashedPassword);
        User GetById(int id);
        User GetByEmail(string email);
        bool IsEmailUniq(string email);
    }
}