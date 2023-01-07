using System.Threading.Tasks;

namespace MusicProgress.Services.Interfaces;

public interface ILessonService
{
    Task<string> CreateLessonAsync(string name, string category);
}