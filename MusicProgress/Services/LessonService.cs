using System.Collections.Generic;
using System.Threading.Tasks;
using MusicProgress.Data;
using MusicProgress.Services.Interfaces;

namespace MusicProgress.Services;

public class LessonService : ILessonService
{
    private readonly AppDbContext _context;

    public LessonService(AppDbContext context)
    {
        _context = context;
    }
    public async Task<string> CreateLessonAsync(Lesson lesson)
    {
        await _context.Lessons.AddAsync(lesson);
        await _context.SaveChangesAsync();
        return lesson.LessonId.ToString();
    }

    public Task<List<AudioResult>> GetLessonsAsync(int userId)
    {
        throw new System.NotImplementedException();
    }
}
