using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace AudioStorage.Data;
[Table("audios")]
public class Audio
{
    public Guid AudioId { get; set; }
    public Guid ProjectId { get; set; }
    public Project Project { get; set; }
}