using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Minio;

namespace MusicProgress.Services.Interfaces;

public interface IFileAppService
{
    Task UploadObjectAsync(string name, Stream data);
    Task<Stream> GetObjectAsync(string name);
}