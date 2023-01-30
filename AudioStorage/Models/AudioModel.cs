using Microsoft.AspNetCore.Http;

namespace AudioStorage.Models;

public class AudioModel
{
    public string LessonId { get; set; }
    public IFormFile AudioFile { get; set; }
}