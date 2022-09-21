using System.Net;
using Persistence;
using System.Net.Sockets;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;

namespace Aplication.Services.ServerFascade
{
    public class EndpointProvider : IEndpointProvider
    {
        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private const int PORT_MIN = 1000;
        private const int PORT_MAX = 65535;

        private ICollection<int> RESERVED = new List<int>() { 0, 80, 8080 };

        public EndpointProvider(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;
        }

        public NetworkInterface[] NetworkAdapters
        {
            get
            {
                return NetworkInterface.GetAllNetworkInterfaces()
                .Where(e => e.OperationalStatus == OperationalStatus.Up &&
                    (
                        e.NetworkInterfaceType == NetworkInterfaceType.Wireless80211 ||
                        e.NetworkInterfaceType == NetworkInterfaceType.Ethernet ||
                        e.NetworkInterfaceType == NetworkInterfaceType.Loopback ||
                        e.NetworkInterfaceType == NetworkInterfaceType.GigabitEthernet
                    )
                )
                .ToArray();
            }
        }

        public NetworkInterface GetDefaultAdapter()
        {
            return NetworkAdapters
                .First(x => x.NetworkInterfaceType != NetworkInterfaceType.Loopback
                    && x.NetworkInterfaceType != NetworkInterfaceType.Tunnel
                    && x.OperationalStatus == OperationalStatus.Up
                    && x.Name.StartsWith("vEthernet") == false
                );
        }

        private int getRandomWithExclusion(
            int start,
            int end,
            List<int> excludes
        )
        {
            excludes.Sort();

            int random = start + new Random().Next(end - start + 1 - excludes.Count);

            foreach (int exclude in excludes)
            {
                if (random < exclude)
                {
                    break;
                }
                random++;
            }
            return random;
        }

        public async Task<List<int>> GetUsedPorts(IPAddress ip)
        {
            return (await GetDbUsedPorts(ip))
            .Concat(GetRuntimeUsedPorts(ip))
            .Concat(RESERVED)
            .Distinct()
            .ToList();
        }

        private async Task<List<int>> GetDbUsedPorts(
            IPAddress ip,
            CancellationToken ct = default
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            string str_ip = ip.ToString();

            List<int> list = await dbContext.Endpoints
                .Where(e => e.IpAddress == str_ip)
                .Select(e => e.Port)
                .ToListAsync(ct);

            if (list == null)
            {
                return new List<int>();
            }

            return list.Distinct().ToList();
        }

        private List<int> GetRuntimeUsedPorts(IPAddress ip)
        {
            IPGlobalProperties ipGlobalProperties = IPGlobalProperties.GetIPGlobalProperties();
            IPEndPoint[] tcpConnInfoArray = ipGlobalProperties.GetActiveTcpListeners();

            var list = tcpConnInfoArray
            .Where(e => e.Address.Equals(ip))
            .Select(e => e.Port)
            .ToList();

            if (list == null)
            {
                return new List<int>();
            }

            return list;
        }

        public System.Net.IPAddress GetDefaultGateway()
        {
            return GetDefaultAdapter()
            .GetIPProperties().GatewayAddresses
            .Select(g => g.Address)
            .Where(a => a != null)
            .First();
        }

        public System.Net.IPAddress GetDefaultIp()
        {
            return GetDefaultAdapter()
            .GetIPProperties().UnicastAddresses
            .Where(u => u.Address.AddressFamily == AddressFamily.InterNetwork)
            .Select(i => i.Address)
            .Where(a => a != null)
            .First();
        }

        public async Task<IPEndPoint> GetRanodmEndpoint()
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var dif_ip = GetDefaultIp();

            var excludes = await GetUsedPorts(dif_ip);

            var port = getRandomWithExclusion(PORT_MIN, PORT_MAX, excludes);

            var endpont = new IPEndPoint(dif_ip, port);

            return endpont;
        }

        public async Task<bool> IsUsed(IPEndPoint endpoint)
        {
            var runtime = IsUsedByRuntime(endpoint);

            var db = await IsUsedByDb(endpoint);

            return runtime || db;
        }

        private bool IsUsedByRuntime(IPEndPoint source_endpoint)
        {
            IPGlobalProperties ipGlobalProperties = IPGlobalProperties.GetIPGlobalProperties();
            IPEndPoint[] tcpConnInfoArray = ipGlobalProperties.GetActiveTcpListeners();

            foreach (IPEndPoint endpoint in tcpConnInfoArray)
            {
                if (endpoint.AreEqual(source_endpoint))
                {
                    return true;
                }
            }

            foreach (var port in RESERVED)
            {
                if (port == source_endpoint.Port)
                {
                    return true;
                }
            }

            return false;
        }

        private async Task<bool> IsUsedByDb(
            IPEndPoint requested,
            CancellationToken ct = default
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            string str_ip = requested.Address.ToString();

            return await dbContext.Endpoints
                .Where(e => e.IpAddress == str_ip && e.Port == requested.Port)
                .AnyAsync(ct);
        }
    }
}