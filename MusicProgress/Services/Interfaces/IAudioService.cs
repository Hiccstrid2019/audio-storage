﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using MusicProgress.Data;

namespace MusicProgress.Services.Interfaces;

public interface IAudioService
{
    Task<string> AddAudioForProjectAsync(Stream stream, string projectId);
    Task<Stream> GetAudioAsync(string audioId);
    Task<string> GetUrlAudioAsync(string audioId);
    Task<Audio> RemoveAudioAsync(Guid audioId);
}
