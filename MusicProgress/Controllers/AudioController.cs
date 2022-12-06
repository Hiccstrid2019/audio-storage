using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MusicProgress.Controllers
{
    [ApiController]
    [Route("api")]
    public class AudioController : ControllerBase
    {
        [HttpPost("audio")]
        public async Task<IActionResult> UploadAudio(IFormFile file)
        {
            if (file.Length > 0)
            {
                await using (var stream = new FileStream("test.ogg", FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }

            return Ok();
        }
    }
}