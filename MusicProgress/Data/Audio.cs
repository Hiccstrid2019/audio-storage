using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MusicProgress.Data;
[Table("audios")]
public class Audio
{
    public Guid AudioId { get; set; }
    public Guid LessonId { get; set; }
    public Lesson Lesson { get; set; }
}