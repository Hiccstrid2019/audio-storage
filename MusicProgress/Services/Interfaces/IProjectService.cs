using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MusicProgress.Data;

namespace MusicProgress.Services.Interfaces;

public interface IProjectService
{
    Task<string> CreateProjectAsync(Project project);
    Task RemoveProjectAsync(Guid projectId);
    Task<List<ProjectResult>> GetProjectsAsync(int userId);
}
