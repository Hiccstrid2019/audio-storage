using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AudioStorage.Data;
using AudioStorage.DTO.Project;

namespace AudioStorage.Services.Interfaces;

public interface IProjectService
{
    Task<Project> CreateProjectAsync(CreateProjectDto createProjectDto);
    Task RemoveProjectAsync(Guid projectId);
    Task<List<ProjectResult>> GetProjectsAsync(int userId);
    Task<ProjectResult> GetProjectAsync(int userId, Guid projectId);
    Task<Project> UpdateProjectAsync(UpdateProjectDto updateProjectDto);
    Task AddPosterAsync(string projectId, Stream stream);
    Task<string?> GetUrlPosterAsync(string projectId);
    Task<Project> UpdatePosterPosition(Project project);
    Task<Project> SetSharedProject(Guid projectId, bool value);
    Task<SharedProjectResult?> GetSharedProjectAsync(Guid projectId);
}
