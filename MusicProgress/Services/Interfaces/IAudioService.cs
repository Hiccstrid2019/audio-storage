using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace MusicProgress.Services.Interfaces;

public interface IAudioService
{
    Task<string> AddAudioForProjectAsync(Stream stream, string projectId);
    Task<Stream> GetAudioAsync(string audioId);
    Task<string> GetUrlAudioAsync(string audioId);
}
