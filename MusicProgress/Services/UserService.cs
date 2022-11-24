using System.Linq;
using MusicProgress.Data;
using MusicProgress.Services.Interfaces;

namespace MusicProgress.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }
    public int CreateUser(User user)
    {
        _context.Add(user);
        _context.SaveChanges();
        return user.UserId;
    }

    public User GetById(int id)
    {
        return _context.Users
            .SingleOrDefault(u => u.UserId == id);
    }

    public User GetByEmail(string email)
    {
        return _context.Users.SingleOrDefault(u => u.Email == email);
    }

    public bool IsEmailUniq(string email)
    {
        var user = _context.Users.SingleOrDefault(u => u.Email == email);
        return user == null;
    }

    public string GetRefreshToken(int userId)
    {
        throw new System.NotImplementedException();
    }

    public void SaveRefreshToken(int userIf)
    {
        throw new System.NotImplementedException();
    }
}