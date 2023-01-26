
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MusicProgress.Data;

[Table("projects")]
public class Project
{
    public Guid ProjectId { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}
