using System.ComponentModel.DataAnnotations;

namespace MusicProgress.DTO;

public class GetBlobRequestDto
{
    [Required] 
    public string Name { get; set; }
}