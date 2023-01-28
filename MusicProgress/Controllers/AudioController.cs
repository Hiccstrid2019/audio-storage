using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MusicProgress.Models;
using MusicProgress.Services.Interfaces;

namespace MusicProgress.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/audio")]
    public class AudioController : ControllerBase
    {
        private readonly IAudioService _audioService;

        public AudioController(IAudioService audioService)
        {
            _audioService = audioService;
        }
        [HttpPost]
        public async Task<IActionResult> UploadAudio([FromForm] AudioModel model)
        {
            if (model.AudioFile.Length > 0)
            {
                using var memoryStream = new MemoryStream();
                await model.AudioFile.CopyToAsync(memoryStream);
                var id = await _audioService.AddAudioForProjectAsync(memoryStream, model.LessonId);
                var url = await _audioService.GetUrlAudioAsync(id);
                return Ok(new {Id = id, Url = url});
            }

            return NotFound();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> DownloadAudio(string fileName)
        {
            var stream = await _audioService.GetAudioAsync(fileName);
            return File(stream, "application/octet-stream");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAudio(string id)
        {
            var audio = await _audioService.RemoveAudioAsync(Guid.Parse(id));
            return Ok(new {AudioId = audio.AudioId, ProjectId = audio.ProjectId});
        }
    }
}