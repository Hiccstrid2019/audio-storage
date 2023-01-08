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
    public async Task<int> CreateLessonAsync(Lesson lesson)
    {
        await _context.Lessons.AddAsync(lesson);
        await _context.SaveChangesAsync();
        return lesson.LessonId;
    }
}