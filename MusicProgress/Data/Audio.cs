using System;

namespace MusicProgress.Data;

public class Audio
{
    public Guid AudioId { get; set; }
    public int LessonId { get; set; }
    public Lesson Lesson { get; set; }
}