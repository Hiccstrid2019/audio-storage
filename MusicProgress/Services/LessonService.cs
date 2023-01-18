using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MusicProgress.Data;
using MusicProgress.Services.Interfaces;

namespace MusicProgress.Services;

public class LessonService : ILessonService
{
    private readonly AppDbContext _context;
    private readonly IAudioService _audioService;

    public LessonService(AppDbContext context, IAudioService audioService)
    {
        _context = context;
        _audioService = audioService;
    }
    public async Task<string> CreateLessonAsync(Lesson lesson)
    {
        await _context.Lessons.AddAsync(lesson);
        await _context.SaveChangesAsync();
        return lesson.LessonId.ToString();
    }

    public async Task<List<LessonResult>> GetLessonsAsync(int userId)
    {
        var lessons = await _context.Lessons
            .Where(lesson => lesson.UserId == userId)
            .Select(lesson => new LessonResult()
            {
                Id = lesson.LessonId,
                Title = lesson.Title,
                Category = lesson.Category,
                Audios = _context.Audios.Where(audio => audio.LessonId == lesson.LessonId)
                    .Select(audio => new AudioResult() {Id = audio.AudioId, Url = ""})
                    .ToList()
            }).ToListAsync();
        foreach (var lesson in lessons)
        {
            foreach (var audio in lesson.Audios)
            {
                audio.Url = await _audioService.GetUrlAudioAsync(audio.Id.ToString());
            }
        }

        return lessons;
    }
}
