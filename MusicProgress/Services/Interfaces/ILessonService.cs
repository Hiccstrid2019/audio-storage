using System.Threading.Tasks;
using MusicProgress.Data;

namespace MusicProgress.Services.Interfaces;

public interface ILessonService
{
    Task<int> CreateLessonAsync(Lesson lesson);
}