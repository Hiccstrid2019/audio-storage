using Microsoft.AspNetCore.Http;

namespace MusicProgress.Models;

public class AudioModel
{
    public string LessonId { get; set; }
    public IFormFile AudioFile { get; set; }
}