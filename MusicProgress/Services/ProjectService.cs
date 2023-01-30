﻿using System;
using System.Collections.Generic;
using System.IO;
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
    private readonly IFileAppService _fileAppService;

    public ProjectService(AppDbContext context, IAudioService audioService, IFileAppService fileAppService)
    {
        _context = context;
        _audioService = audioService;
        _fileAppService = fileAppService;
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
                TimeCreated = project.TimeCreated,
                TimeModified = project.TimeModified,
                Audios = _context.Audios.Where(audio => audio.ProjectId == project.ProjectId)
                    .Select(audio => new AudioResult() {Id = audio.AudioId, Url = ""})
                    .ToList()
            }).ToListAsync();
        foreach (var project in projects)
        {
            var posterUrl = await GetUrlPosterAsync(project.Id.ToString());
            if (project != null)
            {
                project.PosterUrl = posterUrl;
            }
            foreach (var audio in project.Audios)
            {
                audio.Url = await _audioService.GetUrlAudioAsync(audio.Id.ToString());
            }
        }

        return projects;
    }

    public async Task<ProjectResult> GetProjectAsync(int userId, Guid projectId)
    {
        var project = await _context.Projects
            .Where(project => project.UserId == userId && project.ProjectId == projectId)
            .Select(project => new ProjectResult()
            {
                Id = project.ProjectId,
                Title = project.Title,
                Category = project.Category,
                TimeCreated = project.TimeCreated,
                TimeModified = project.TimeModified,
                Audios = _context.Audios.Where(audio => audio.ProjectId == project.ProjectId)
                    .Select(audio => new AudioResult() {Id = audio.AudioId, Url = ""})
                    .ToList()
            })
            .FirstOrDefaultAsync();
        var posterUrl = await GetUrlPosterAsync(project.Id.ToString());
        if (project != null)
        {
            project.PosterUrl = posterUrl;
        }
        foreach (var audio in project.Audios)
        {
            audio.Url = await _audioService.GetUrlAudioAsync(audio.Id.ToString());
        }
        return project;
    }

    public async Task<Project> UpdateProjectAsync(Project updatedProject)
    {
        var project = await _context.Projects.FirstOrDefaultAsync(l => l.ProjectId == updatedProject.ProjectId);
        if (project != null)
        {
            project.Title = updatedProject.Title;
            project.Category = updatedProject.Category;
            project.TimeModified = updatedProject.TimeModified;
            await _context.SaveChangesAsync();
        }
        project = await _context.Projects.FirstOrDefaultAsync(l => l.ProjectId == updatedProject.ProjectId);
        return updatedProject;
    }

    public async Task AddPosterAsync(string projectId, Stream stream)
    {
        await _fileAppService.UploadObjectAsync(projectId, stream);
    }

    public async Task<string?> GetUrlPosterAsync(string projectId)
    {
        var url = await _fileAppService.GetUrlObjectAsync(projectId);
        return url;
    }
}
