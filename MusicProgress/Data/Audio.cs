using System;

namespace MusicProgress.Data;

public class Audio
{
    public Guid AudioId { get; set; }
    public Guid LessonId { get; set; }
    public Lesson Lesson { get; set; }
}