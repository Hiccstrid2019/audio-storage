using System;

namespace MusicProgress.Data;

public class RefreshToken
{
    public int RefreshTokenId { get; set; }
    public string Token { get; set; }
    public DateTime? TimeCreated { get; set; }
    public DateTime? TokenExpires { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}