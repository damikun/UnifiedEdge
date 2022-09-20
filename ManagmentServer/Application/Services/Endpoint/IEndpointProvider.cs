using System.Net;
using System.Net.NetworkInformation;

namespace Aplication.Services.ServerFascade
{
    public interface IEndpointProvider
    {
        public NetworkInterface[] NetworkAdapters { get; }

        public NetworkInterface GetDefaultAdapter();

        public Task<IPEndPoint> GetRanodmEndpoint();

        public System.Net.IPAddress GetDefaultIp();

        public System.Net.IPAddress GetDefaultGateway();

        public Task<bool> IsUsed(IPEndPoint endpoint);

        public Task<List<int>> GetUsedPorts(IPAddress ip);

    }
}