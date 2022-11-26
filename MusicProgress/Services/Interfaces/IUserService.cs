using MusicProgress.Data;

namespace MusicProgress.Services.Interfaces
{
    public interface IUserService
    {
        int CreateUser(User user);
        User GetById(int id);
        User GetByEmail(string email);
        bool IsEmailUniq(string email);
    }
}