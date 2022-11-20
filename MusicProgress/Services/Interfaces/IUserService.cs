using MusicProgress.Data;

namespace MusicProgress.Services.Interfaces
{
    public interface IUserService
    {
        string CreateUser(string username, string email, string password);
        User GetById(string id);
    }
}