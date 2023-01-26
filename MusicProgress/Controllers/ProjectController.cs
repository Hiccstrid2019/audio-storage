using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicProgress.Data;
using MusicProgress.Models;
using MusicProgress.Services.Interfaces;

namespace MusicProgress.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }
        
        [HttpGet("projects")]
        public async Task<ActionResult<List<ProjectResult>>> GetProjects()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            var projects = await _projectService.GetProjectsAsync(Convert.ToInt32(userId));
            return projects;
        }
        
        
        [HttpPost("[action]")]
        public async Task<ActionResult> Project(ProjectModel model)
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            var newProject = new Project()
            {
                Category = model.Category,
                Title = model.Title,
                UserId = Convert.ToInt32(userId)
            };
            var projectId = await _projectService.CreateProjectAsync(newProject);
            return Ok(new { Id = projectId, Title = model.Title, Category = model.Category});
        }
        
        [HttpDelete("project/{id}")]
        public async Task<ActionResult> DeleteProject(string id)
        {
            await _projectService.RemoveProjectAsync(Guid.Parse(id));
            return Ok(new {Id = id});
        }
    }
}