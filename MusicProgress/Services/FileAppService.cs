using System.Threading.Tasks;
using MusicProgress.DTO;
using MusicProgress.Services.BlobContainers;
using MusicProgress.Services.Interfaces;
using Volo.Abp.Application.Services;
using Volo.Abp.BlobStoring;

namespace MusicProgress.Services;

public class FileAppService : ApplicationService, IFileAppService
{
    private readonly IBlobContainer<AudioContainer> _audioContainer;

    public FileAppService(IBlobContainer<AudioContainer> audioContainer)
    {
        _audioContainer = audioContainer;
    }

    public async Task SaveBlobAsync(SaveBlobInputDto input)
    {
        await _audioContainer.SaveAsync(input.Name, input.Content, true);
    }

    public async Task<BlobDto> GetBlobAsync(GetBlobRequestDto input)
    {
        var blob = await _audioContainer.GetAllBytesAsync(input.Name);
        return new BlobDto()
        {
            Name = input.Name,
            Content = blob
        };
    }
}