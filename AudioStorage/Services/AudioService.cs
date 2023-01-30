using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AudioStorage.Data;
using AudioStorage.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AudioStorage.Services;

public class AudioService : IAudioService
{
    private readonly AppDbContext _context;
    private readonly IFileAppService _fileAppService;

    public AudioService(AppDbContext context, IFileAppService fileAppService)
    {
        _context = context;
        _fileAppService = fileAppService;
    }
    
    public async Task<string> AddAudioForProjectAsync(Stream stream, string projectId)
    {
        var audio = new Audio()
        {
            ProjectId = Guid.Parse(projectId)
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

    public async Task<Audio> RemoveAudioAsync(Guid audioId)
    {
        var audio = await _context.Audios.FirstOrDefaultAsync(audio => audio.AudioId == audioId);
        if (audio != null)
        {
            _context.Audios.Remove(audio);
            await _context.SaveChangesAsync();
            await _fileAppService.RemoveObjectAsync(audio.AudioId.ToString());
        }

        return audio;
    }
}