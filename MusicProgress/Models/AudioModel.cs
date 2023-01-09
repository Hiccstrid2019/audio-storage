using Microsoft.AspNetCore.Http;

namespace MusicProgress.Models;

public class AudioModel
{
    public int LessonId { get; set; }
    public IFormFile AudioFile { get; set; }
}