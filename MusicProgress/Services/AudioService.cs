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
    
    public async Task<string> UploadAudioAsync(Stream stream)
    {
        var id = Guid.NewGuid() + ".ogg";
        await _fileAppService.UploadObjectAsync(id, stream);
        return id;
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