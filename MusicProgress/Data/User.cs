using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MusicProgress.Data
{
    [Table("users")]
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
    }
}