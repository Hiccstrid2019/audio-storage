using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MusicProgress.Data;

namespace MusicProgress.Services.Interfaces;

public interface ILessonService
{
    Task<string> CreateLessonAsync(Lesson lesson);
    Task RemoveLessonAsync(Guid lessonId);
    Task<List<LessonResult>> GetLessonsAsync(int userId);
}
