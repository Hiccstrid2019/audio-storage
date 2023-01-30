using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AudioStorage.Data;

[Table("refreshtokens")]
public class RefreshToken
{
    public int RefreshTokenId { get; set; }
    public string Token { get; set; }
    public DateTime? TimeCreated { get; set; }
    public DateTime? TokenExpires { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}