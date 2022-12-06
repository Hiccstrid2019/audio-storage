using System.Threading.Tasks;
using MusicProgress.DTO;

namespace MusicProgress.Services.Interfaces;
using Volo.Abp.Application.Services;

public interface IFileAppService : IApplicationService
{
    Task SaveBlobAsync(SaveBlobInputDto input);
    Task<BlobDto> GetBlobAsync(GetBlobRequestDto input);
}