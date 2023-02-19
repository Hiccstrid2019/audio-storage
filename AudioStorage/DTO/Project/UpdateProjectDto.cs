using System;

namespace AudioStorage.DTO.Project;

public class UpdateProjectDto
{
    public Guid ProjectId { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
}