using Microsoft.AspNetCore.Http;

namespace AudioStorage.Models;

public class PosterModel
{
    public string ProjectId { get; set; }
    public IFormFile ImgFile { get; set; }
    public double PosterPosition { get; set; }
}