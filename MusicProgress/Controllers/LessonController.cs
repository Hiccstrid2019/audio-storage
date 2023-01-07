using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicProgress.Models;
using MusicProgress.Services.Interfaces;

namespace MusicProgress.Controllers
{
    
    [Authorize]
    [ApiController]
    [Route("api")]
    public class LessonController : ControllerBase
    {
        private readonly ILessonService _lessonService;

        public LessonController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }

        [HttpPost("action")]
        public async Task<IActionResult> CreateLesson(LessonModel model)
        {
            var lessonId = await _lessonService.CreateLessonAsync(model.Title, model.Category);
            return Ok(new { LessonId = lessonId });
        }
    }
}