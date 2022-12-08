using System.IO;
using Microsoft.Extensions.Options;
using Minio;
using MusicProgress.Services.Interfaces;

namespace MusicProgress.Services;

public class MinIoService : IFileAppService
{
    private readonly MinioClient _client;
    private readonly MinioConfig _config;

    public MinIoService(MinioClient client, IOptions<MinioConfig> options)
    {
        _client = client;
        _config = options.Value;
    }

    public async void UploadObject(string name, Stream data)
    {
        var putObjectArgs = new PutObjectArgs()
            .WithBucket(_config.BucketName)
            .WithObject(name)
            .WithObjectSize(data.Length)
            .WithStreamData(data)
            .WithContentType(_config.ContentType);
        await _client.PutObjectAsync(putObjectArgs).ConfigureAwait(false);
    }

    public async void GetObject(string name)
    {
        var args = new GetObjectArgs()
            .WithBucket(_config.BucketName)
            .WithObject(name);
        var stat = await _client.GetObjectAsync(args);
    }
}