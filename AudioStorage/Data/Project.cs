
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AudioStorage.Data;

[Table("projects")]
public class Project
{
    public Guid ProjectId { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public DateTime TimeCreated { get; set; }
    public DateTime TimeModified { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}
