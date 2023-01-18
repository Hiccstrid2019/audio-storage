using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using MusicProgress.Data;
using MusicProgress.Services.Interfaces;

namespace MusicProgress.Services;

public class AudioService : IAudioService
{
    private readonly AppDbContext _context;
    private readonly IFileAppService _fileAppService;

    public AudioService(AppDbContext context, IFileAppService fileAppService)
    {
        _context = context;
        _fileAppService = fileAppService;
    }
    
    public async Task<string> AddAudioForLessonAsync(Stream stream, string lessonId)
    {
        var audio = new Audio()
        {
            LessonId = Guid.Parse(lessonId)
        };
        await _context.Audios.AddAsync(audio);
        await _context.SaveChangesAsync();
        await _fileAppService.UploadObjectAsync(audio.AudioId.ToString(), stream);
        return audio.AudioId.ToString();
    }

    public async Task<Stream> GetAudioAsync(string audioId)
    {
        var stream = await _fileAppService.GetObjectAsync(audioId);
        return stream;
    }

    public async Task<string> GetUrlAudioAsync(string audioId)
    {
        var url = await _fileAppService.GetUrlObjectAsync(audioId);
        return url;
    }

    public Task<List<string>> GetAudioIdsByUserIdAsync(int userId)
    {
        throw new System.NotImplementedException();
    }
}