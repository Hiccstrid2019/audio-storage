using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicProgress.Services;
using MusicProgress.Services.Interfaces;

namespace MusicProgress.Controllers
{
    [ApiController]
    [Route("api")]
    public class AudioController : ControllerBase
    {
        private readonly IAudioService _audioService;

        public AudioController(IAudioService audioService)
        {
            _audioService = audioService;
        }
        [HttpPost("audio")]
        public async Task<IActionResult> UploadAudio(IFormFile file)
        {
            if (file.Length > 0)
            {
                using var memoryStream = new MemoryStream();
                await file.CopyToAsync(memoryStream);
                var id = await _audioService.UploadAudioAsync(memoryStream);
                var url = await _audioService.GetUrlAudioAsync(id);
                return Ok(new {UploadAudioId = id, Url = url});
            }

            return Ok();
        }

        [HttpGet("audio/{fileName}")]
        public async Task<IActionResult> DownloadAudio(string fileName)
        {
            var stream = await _audioService.GetAudioAsync(fileName);
            return File(stream, "application/octet-stream");
        }
    }
}