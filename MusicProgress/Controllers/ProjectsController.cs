﻿using System;
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
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<ProjectResult>>> GetProjects()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            var projects = await _projectService.GetProjectsAsync(Convert.ToInt32(userId));
            return projects;
        }
        
        
        [HttpPost]
        public async Task<ActionResult> Project(ProjectModel model)
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            var newProject = new Project()
            {
                Category = model.Category,
                Title = model.Title,
                UserId = Convert.ToInt32(userId),
                TimeCreated = DateTime.Now,
                TimeModified = DateTime.Now
            };
            var projectId = await _projectService.CreateProjectAsync(newProject);
            return Ok(new { Id = projectId, Title = newProject.Title, Category = newProject.Category, TimeCreated = newProject.TimeCreated, TimeModified = newProject.TimeModified});
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProject(string id)
        {
            await _projectService.RemoveProjectAsync(Guid.Parse(id));
            return Ok(new {Id = id});
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProject(ProjectModel model)
        {
            var updatedProject = new Project()
            {
                ProjectId = Guid.Parse(model.ProjectId),
                Category = model.Category,
                Title = model.Title,
                TimeModified = DateTime.Now
            };
            var project = await _projectService.UpdateProjectAsync(updatedProject);
            return Ok(new {Id = project.ProjectId, Title = project.Title, Category = project.Category, TimeModified = project.TimeModified});
        }
    }
}