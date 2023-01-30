using Microsoft.AspNetCore.Http;

namespace MusicProgress.Models;

public class PosterModel
{
    public string ProjectId { get; set; }
    public IFormFile ImgFile { get; set; }
}