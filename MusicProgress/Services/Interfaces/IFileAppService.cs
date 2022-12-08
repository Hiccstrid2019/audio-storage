using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Minio;

namespace MusicProgress.Services.Interfaces;

public interface IFileAppService
{
    void UploadObject(string name, Stream data);
    void GetObject(string name);
}