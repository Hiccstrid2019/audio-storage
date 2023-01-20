
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MusicProgress.Data;

[Table("lessons")]
public class Lesson
{
    public Guid LessonId { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}
