using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace MusicProgress.Services.Interfaces;

public interface IAudioService
{
    Task<string> AddAudioForLessonAsync(Stream stream, int lessonId);
    Task<Stream> GetAudioAsync(string audioId);
    Task<string> GetUrlAudioAsync(string audioId);
    Task<List<string>> GetAudioIdsByUserIdAsync(int userId);
}
