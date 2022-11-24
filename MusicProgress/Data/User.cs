using System;

namespace MusicProgress.Data
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? TimeCreated { get; set; }
        public DateTime? TokenExpires { get; set; }
    }
}