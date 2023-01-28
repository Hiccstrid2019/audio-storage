using System;
using System.Collections.Generic;

namespace MusicProgress.Data;

public class ProjectResult
{
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public DateTime TimeCreated { get; set; }
    public DateTime TimeModified { get; set; }
    public List<AudioResult> Audios { get; set; }
}
