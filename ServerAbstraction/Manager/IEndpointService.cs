
using System.Net;

namespace Server.Manager
{
    public interface IEndpointService
    {
        public Task<bool> IsUsed(IPEndPoint endpoint);

        public Task<IPEndPoint> GetRanodmEndpoint();
    }
}