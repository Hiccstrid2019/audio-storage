using MusicProgress.Data;

namespace MusicProgress.Services.Interfaces
{
    public interface IUsersInterface
    {
        bool CreateUser(string username, string email, string password);
        User GetById(string id);
    }
}