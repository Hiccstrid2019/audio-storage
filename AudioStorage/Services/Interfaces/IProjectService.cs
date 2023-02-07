using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AudioStorage.Data;

namespace AudioStorage.Services.Interfaces;

public interface IProjectService
{
    Task<string> CreateProjectAsync(Project project);
    Task RemoveProjectAsync(Guid projectId);
    Task<List<ProjectResult>> GetProjectsAsync(int userId);
    Task<ProjectResult> GetProjectAsync(int userId, Guid projectId);
    Task<Project> UpdateProjectAsync(Project project);
    Task AddPosterAsync(string projectId, Stream stream);
    Task<string?> GetUrlPosterAsync(string projectId);
    Task<Project> UpdatePosterPosition(Project project);
}
