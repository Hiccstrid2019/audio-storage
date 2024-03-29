﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using AudioStorage.Data;
using AudioStorage.DTO.Project;
using AudioStorage.Models;
using AudioStorage.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AudioStorage.Controllers
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
        public async Task<ActionResult<IList<ProjectResult>>> GetProjects()
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            var projects = await _projectService.GetProjectsAsync(Convert.ToInt32(userId));
            return projects;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectResult>> GetProject(string id)
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            var project = await _projectService.GetProjectAsync(Convert.ToInt32(userId), Guid.Parse(id));
            return project;
        }
        
        [AllowAnonymous]
        [HttpGet("shared/{id}")]
        public async Task<ActionResult<SharedProjectResult>> GetSharedProject(string id)
        {
            var project = await _projectService.GetSharedProjectAsync(Guid.Parse(id));
            if (project != null)
                return project;
            return NotFound("This project is not shared");
        }
        
        [HttpPost]
        public async Task<ActionResult> Project(ProjectModel model)
        {
            var claimsIdentity = User.Identity as ClaimsIdentity;
            var userId = claimsIdentity.FindFirst(ClaimTypes.Name)?.Value;
            var newProject = new CreateProjectDto()
            {
                Title = model.Title,
                Category = model.Category,
                UserId = Convert.ToInt32(userId)
            };
            var project = await _projectService.CreateProjectAsync(newProject);
            return Ok(new { Id = project.ProjectId, Title = project.Title, Category = project.Category, TimeCreated = project.TimeCreated, TimeModified = project.TimeModified});
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
            var updatedProject = new UpdateProjectDto()
            {
                ProjectId = Guid.Parse(model.ProjectId),
                Category = model.Category,
                Title = model.Title
            };
            var project = await _projectService.UpdateProjectAsync(updatedProject);
            return Ok(new {Id = project.ProjectId, Title = project.Title, Category = project.Category, TimeModified = project.TimeModified});
        }

        [HttpPost("poster")]
        public async Task<ActionResult> AddPoster([FromForm] PosterModel model)
        {
            if (model.ImgFile.Length > 0)
            {
                using var memoryStream = new MemoryStream();
                await model.ImgFile.CopyToAsync(memoryStream);
                await _projectService.AddPosterAsync(model.ProjectId, memoryStream);
                var url = await _projectService.GetUrlPosterAsync(model.ProjectId);
                return Ok(new {ProjectId = model.ProjectId, PosterUrl = url, PosterPosition = 50});
            }

            return NotFound();
        }

        [HttpPut("poster/{id}")]
        public async Task<ActionResult> UpdatePosterPosition(string id, PosterModel model)
        {
            var updatedProject = new Project()
            {
                ProjectId = Guid.Parse(id),
                PosterPosition = model.PosterPosition
            };
            var project = await _projectService.UpdatePosterPosition(updatedProject);
            return Ok(new {Id = project.ProjectId, PosterPosition = project.PosterPosition});
        }

        [HttpPut("shared/{id}")]
        public async Task<ActionResult> UpdateProjectSharedStatus(string id, SharedModel model)
        {
            var project = await _projectService.SetSharedProject(Guid.Parse(id), model.IsShared);
            return Ok(new {Id = project.ProjectId, IsShared = project.IsShared});
        }
    }
}