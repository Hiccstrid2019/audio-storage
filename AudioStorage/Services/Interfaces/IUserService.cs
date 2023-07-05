using System.Threading.Tasks;
using AudioStorage.Data;

namespace AudioStorage.Services.Interfaces
{
    public interface IUserService
    {
        Task<int> CreateUserAsync(User user);
        Task<User> GetByIdAsync(int id);
        Task<User> GetByEmailAsync(string email);
        Task<bool> IsEmailUniqAsync(string email);
    }
}