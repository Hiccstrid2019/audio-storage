using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace MusicProgress.Services.Interfaces;

public interface IAudioService
{
    Task<string> AddAudioForLessonAsync(Stream stream, string lessonId);
    Task<Stream> GetAudioAsync(string audioId);
    Task<string> GetUrlAudioAsync(string audioId);
}
