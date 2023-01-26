using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MusicProgress.Data;
using MusicProgress.Services.Interfaces;

namespace MusicProgress.Services;

public class ProjectService : IProjectService
{
    private readonly AppDbContext _context;
    private readonly IAudioService _audioService;

    public ProjectService(AppDbContext context, IAudioService audioService)
    {
        _context = context;
        _audioService = audioService;
    }
    public async Task<string> CreateProjectAsync(Project project)
    {
        await _context.Projects.AddAsync(project);
        await _context.SaveChangesAsync();
        return project.ProjectId.ToString();
    }

    public async Task RemoveProjectAsync(Guid projectId)
    {
        var project = await _context.Projects.FirstOrDefaultAsync(l => l.ProjectId == projectId);
        if (project != null)
        {
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<List<ProjectResult>> GetProjectsAsync(int userId)
    {
        var projects = await _context.Projects
            .Where(project => project.UserId == userId)
            .Select(project => new ProjectResult()
            {
                Id = project.ProjectId,
                Title = project.Title,
                Category = project.Category,
                Audios = _context.Audios.Where(audio => audio.ProjectId == project.ProjectId)
                    .Select(audio => new AudioResult() {Id = audio.AudioId, Url = ""})
                    .ToList()
            }).ToListAsync();
        foreach (var project in projects)
        {
            foreach (var audio in project.Audios)
            {
                audio.Url = await _audioService.GetUrlAudioAsync(audio.Id.ToString());
            }
        }

        return projects;
    }
}
