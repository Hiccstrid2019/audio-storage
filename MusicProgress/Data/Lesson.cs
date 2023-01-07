
namespace MusicProgress.Data;

public class Lesson
{
    public int LessonId { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}