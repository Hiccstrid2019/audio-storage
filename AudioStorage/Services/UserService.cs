using System.Linq;
using System.Threading.Tasks;
using AudioStorage.Data;
using AudioStorage.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AudioStorage.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }
    public async Task<int> CreateUserAsync(User user)
    {
        await _context.AddAsync(user);
        await _context.SaveChangesAsync();
        return user.UserId;
    }

    public async Task<User> GetByIdAsync(int id)
    {
        return await _context.Users
            .SingleOrDefaultAsync(u => u.UserId == id);
    }

    public async Task<User> GetByEmailAsync(string email)
    {
        return await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
    }

    public async Task<bool> IsEmailUniqAsync(string email)
    {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
        return user == null;
    }
}