using Microsoft.EntityFrameworkCore;
using NuGet.Common;

namespace MusicProgress.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> configuration) : base(configuration) {}

        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Audio> Audios { get; set; }
        public DbSet<Lesson> Lessons { get; set; }
    }
}
