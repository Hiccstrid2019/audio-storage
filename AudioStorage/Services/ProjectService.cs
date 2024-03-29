﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AudioStorage.Data;
using AudioStorage.DTO.Project;
using AudioStorage.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AudioStorage.Services;

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
    public async Task<Project> CreateProjectAsync(CreateProjectDto createProjectDto)
    {
        var project = new Project()
        {
            Title = createProjectDto.Title,
            Category = createProjectDto.Category,
            UserId = createProjectDto.UserId,
            TimeCreated = DateTime.Now,
            TimeModified = DateTime.Now,
            IsShared = false
        };
        await _context.Projects.AddAsync(project);
        await _context.SaveChangesAsync();
        return project;
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
                PosterPosition = project.PosterPosition,
                IsShared = project.IsShared,
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
                PosterPosition = project.PosterPosition,
                IsShared = project.IsShared,
                Audios = _context.Audios.Where(audio => audio.ProjectId == project.ProjectId)
                    .Select(audio => new AudioResult() {Id = audio.AudioId, Url = ""})
                    .ToList()
            })
            .FirstOrDefaultAsync();
        var posterUrl = await GetUrlPosterAsync(project.Id.ToString());
        if (posterUrl != null)
        {
            project.PosterUrl = posterUrl;
        }
        foreach (var audio in project.Audios)
        {
            audio.Url = await _audioService.GetUrlAudioAsync(audio.Id.ToString());
        }
        return project;
    }

    public async Task<Project> UpdateProjectAsync(UpdateProjectDto updateProjectDto)
    {
        var project = await _context.Projects.FirstOrDefaultAsync(l => l.ProjectId == updateProjectDto.ProjectId);
        if (project != null)
        {
            project.Title = updateProjectDto.Title;
            project.Category = updateProjectDto.Category;
            project.TimeModified = DateTime.Now;
            await _context.SaveChangesAsync();
        }
        return project;
    }

    public async Task AddPosterAsync(string projectId, Stream stream)
    {
        var project = await _context.Projects.FirstOrDefaultAsync(l => l.ProjectId == Guid.Parse(projectId));
        if (project != null)
        {
            project.PosterPosition = 50;
            await _context.SaveChangesAsync();
        }
        await _fileAppService.UploadObjectAsync(projectId, stream);
    }

    public async Task<string?> GetUrlPosterAsync(string projectId)
    {
        var url = await _fileAppService.GetUrlObjectAsync(projectId);
        return url;
    }

    public async Task<Project> UpdatePosterPosition(Project updatedProject)
    {
        var project = await _context.Projects.FirstOrDefaultAsync(l => l.ProjectId == updatedProject.ProjectId);
        if (project != null)
        {
            project.PosterPosition = updatedProject.PosterPosition;
            await _context.SaveChangesAsync();
        }
        return updatedProject;
    }

    public async Task<Project> SetSharedProject(Guid projectId, bool value)
    {
        var project = await _context.Projects.FirstOrDefaultAsync(l => l.ProjectId == projectId);
        if (project != null)
        {
            project.IsShared = value;
            await _context.SaveChangesAsync();
        }
        return project;
    }

    public async Task<SharedProjectResult?> GetSharedProjectAsync(Guid projectId)
    {
        var sharedProject = await _context.Projects
            .Where(project => project.ProjectId == projectId && project.IsShared == true)
            .Select(project => new SharedProjectResult()
            {
                Id = project.ProjectId,
                Author = _context.Users.FirstOrDefault(user => user.UserId == project.UserId).UserName,
                Title = project.Title,
                Category = project.Category,
                TimeCreated = project.TimeCreated,
                TimeModified = project.TimeModified,
                PosterPosition = project.PosterPosition,
                Audios = _context.Audios.Where(audio => audio.ProjectId == project.ProjectId)
                    .Select(audio => new AudioResult() {Id = audio.AudioId, Url = ""})
                    .ToList()
            })
            .FirstOrDefaultAsync();
        if (sharedProject != null)
        {
            var posterUrl = await GetUrlPosterAsync(sharedProject.Id.ToString());
            if (posterUrl != null)
            {
                sharedProject.PosterUrl = posterUrl;
            }
            foreach (var audio in sharedProject.Audios)
            {
                audio.Url = await _audioService.GetUrlAudioAsync(audio.Id.ToString());
            }

            return sharedProject;
        }

        return null;
    }
}
