using System.Linq;
using MusicProgress.Data;
using MusicProgress.Services.Interfaces;

namespace MusicProgress.Services;

public class UserService : IUserService
{
    private readonly AppDbContext _context;
    private readonly IAuthService _authService;
    
    public UserService(AppDbContext context, IAuthService service)
    {
        _context = context;
        _authService = service;
    }
    public string CreateUser(string username, string email, string password)
    {
        string hashedPassword = _authService.HashPassword(password);
        var user = new User()
        {
            UserName = username,
            Email = email,
            HashedPassword = hashedPassword
        };
        _context.Add(user);
        _context.SaveChanges();
        return user.UserId;
    }

    public User GetById(string id)
    {
        return _context.Users
            .SingleOrDefault(u => u.UserId == id);
    }
}