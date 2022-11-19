using Microsoft.EntityFrameworkCore;

namespace MusicProgress.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> configuration) : base(configuration) {}

        public DbSet<User> Users { get; set; }
    }
}