using server_eRental.Models.Momo;
using System.Threading.Tasks;

namespace server_eRental.Services.Momo
{
    public interface IMomoService
    {
        Task<MomoExecuteResponse> CreatePaymentAsync(MomoExecuteResponse request);
    }
}