using System.ComponentModel.DataAnnotations;

namespace MusicProgress.DTO;

public class SaveBlobInputDto
{
    public byte[] Content { get; set; }
    [Required]
    public string Name { get; set; }
}