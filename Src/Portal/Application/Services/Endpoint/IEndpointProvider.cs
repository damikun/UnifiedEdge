using System.Net;
using Server.Manager;
using System.Net.NetworkInformation;

namespace Aplication.Services.ServerFascade
{
    public interface IEndpointProvider : IEndpointService
    {
        public bool Any(string? adapter_id = null);

        public NetworkInterface[] NetworkAdapters { get; }

        public NetworkInterface GetDefaultAdapter();

        public System.Net.IPAddress GetDefaultIp();

        public bool IsDefault(string adapter_id);

        public System.Net.IPAddress GetDefaultGateway();

        public Task<List<int>> GetUsedPorts(IPAddress ip);

        public NetworkInterface GetLoopbackInterface();

        public NetworkInterface? GetAdapterById(string adapter_id);
    }
}