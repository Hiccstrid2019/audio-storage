using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicProgress.Data;
using MusicProgress.Models;
using MusicProgress.Services.Interfaces;

namespace MusicProgress.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class LessonController : ControllerBase
    {
        private readonly ILessonService _lessonService;

        public LessonController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }
        
        [HttpGet("lessons")]
        public async Task<ActionResult<List<LessonResult>>> GetLessons()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            var lessons = await _lessonService.GetLessonsAsync(Convert.ToInt32(userId));
            return lessons;
        }
        
        
        [HttpPost("[action]")]
        public async Task<ActionResult> Lesson(LessonModel model)
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            var newLesson = new Lesson()
            {
                Category = model.Category,
                Title = model.Title,
                UserId = Convert.ToInt32(userId)
            };
            var lessonId = await _lessonService.CreateLessonAsync(newLesson);
            return Ok(new { Id = lessonId, Title = model.Title, Category = model.Category});
        }
    }
}