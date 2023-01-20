using System.Net;
using Persistence.Portal;
using System.Net.Sockets;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.Services.ServerFascade
{

    public class EndpointProvider : IEndpointProvider
    {
        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IMemoryCache</c>
        /// </summary>
        private readonly IMemoryCache _cache;

        private const int DEFAULT_PORT_MIN = 1000;
        private const int DEFAULT_PORT_MAX = 65535;

        private ICollection<int> RESERVED = new List<int>() { 0, 80, 8080 };

        public EndpointProvider(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMemoryCache cache)
        {
            _factory = factory;
            _cache = cache;
        }

        public NetworkInterface? GetAdapterById(string adapter_id)
        {
            try
            {
                return NetworkAdapters
                .Where(e => e.Id == adapter_id)
                .FirstOrDefault();
            }
            catch
            {
                return null;
            }
        }

        public NetworkInterface[] NetworkAdapters
        {
            get
            {
                try
                {

                    if (_cache.TryGetValue<NetworkInterface[]>(
                        EndpointProviderCacheConsts.AdapterList,
                        out NetworkInterface[] cached)
                    )
                    {
                        return cached;
                    }

                    var adapters = NetworkInterface.GetAllNetworkInterfaces()
                    .Where(e => !e.IsReceiveOnly &&
                        e.Name.StartsWith("vEthernet") == false &&
                        e.Name.StartsWith("Bluetooth") == false &&
                        (
                            e.NetworkInterfaceType == NetworkInterfaceType.Wireless80211 ||
                            e.NetworkInterfaceType == NetworkInterfaceType.Ethernet ||
                            e.NetworkInterfaceType == NetworkInterfaceType.Loopback ||
                            e.NetworkInterfaceType == NetworkInterfaceType.GigabitEthernet
                        )
                    )
                    .ToArray();

                    _cache.Set<NetworkInterface[]>(
                    EndpointProviderCacheConsts.AdapterList,
                    adapters,
                    new MemoryCacheEntryOptions()
                    {
                        AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(2)
                    });

                    return adapters;
                }
                catch
                {
                    return new NetworkInterface[0];
                }
            }
        }

        public NetworkInterface GetLoopbackInterface()
        {
            if (_cache.TryGetValue<NetworkInterface>(
                EndpointProviderCacheConsts.LoopbackAdapter,
                out NetworkInterface cached)
            )
            {
                return cached;
            }

            var index = NetworkInterface.LoopbackInterfaceIndex;

            var adapter = NetworkInterface.GetAllNetworkInterfaces()[index];

            _cache.Set<NetworkInterface>(
            EndpointProviderCacheConsts.LoopbackAdapter,
            adapter,
            new MemoryCacheEntryOptions()
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(2)
            });

            return adapter;

        }

        public NetworkInterface GetDefaultAdapter()
        {

            if (_cache.TryGetValue<NetworkInterface>(
                EndpointProviderCacheConsts.DefaultAdapter,
                out NetworkInterface cached)
            )
            {
                return cached;
            }

            // First try get loopback
            var adapter = NetworkAdapters
                .FirstOrDefault(x => x.NetworkInterfaceType == NetworkInterfaceType.Loopback
                && x.NetworkInterfaceType != NetworkInterfaceType.Tunnel);

            // Try to get most significat up adapter
            if (adapter == null)
            {
                adapter = NetworkAdapters
                    .FirstOrDefault(x => x.NetworkInterfaceType != NetworkInterfaceType.Loopback
                        && x.NetworkInterfaceType != NetworkInterfaceType.Tunnel
                        && x.OperationalStatus == OperationalStatus.Up
                    );
            }

            // If no match try get any available
            if (adapter == null)
            {
                adapter = NetworkAdapters
                 .First(x => x.NetworkInterfaceType != NetworkInterfaceType.Tunnel);
            }

            _cache.Set<NetworkInterface>(
                EndpointProviderCacheConsts.DefaultAdapter,
                adapter,
                new MemoryCacheEntryOptions()
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(2)
                });

            return adapter;
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


        public bool Any(string? adapter_id = null)
        {
            if (string.IsNullOrWhiteSpace(adapter_id))
            {
                return NetworkAdapters.Any();
            }
            else
            {
                return NetworkAdapters.Any(e => e.Id == adapter_id);
            }
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
            .Where(e => e.Address.MapToIPv4().Equals(ip))
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
            .Select(g => g.Address.MapToIPv4())
            .Where(a => a != null)
            .First();
        }

        public System.Net.IPAddress GetDefaultIp()
        {
            return GetDefaultAdapter()
            .GetIPProperties().UnicastAddresses
            .Where(u => u.Address.AddressFamily == AddressFamily.InterNetwork)
            .Select(i => i.Address.MapToIPv4())
            .Where(a => a != null)
            .First();
        }

        public bool IsDefault(string adapter_id)
        {
            var default_adapter = GetDefaultAdapter();

            return default_adapter.Id == adapter_id;
        }

        public async Task<IPEndPoint> GetRanodmEndpoint()
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var db_default_adapter = await dbContext.Edge
            .Select(e => e.DefaultAdapterId)
            .FirstOrDefaultAsync();

            IPAddress? dif_ip = null;

            if (db_default_adapter != null)
            {
                var adapter = GetAdapterById(db_default_adapter);

                if (adapter != null)
                {
                    dif_ip = adapter
                    .GetIPProperties()
                    .UnicastAddresses
                    .Where(e => e.Address.AddressFamily == AddressFamily.InterNetwork)
                    .Select(e => e.Address.MapToIPv4())
                    .First();
                }

            }

            if (dif_ip == null)
            {
                dif_ip = GetDefaultIp();
            }

            var excludes = await GetUsedPorts(dif_ip);

            var port_range = GetPortRangeOrDefault();

            var port = getRandomWithExclusion(port_range.min, port_range.max, excludes);

            var endpont = new IPEndPoint(dif_ip, port);

            return endpont;
        }

        public static (int min, int max) GetPortRangeOrDefault()
        {
            var port_min = Environment.GetEnvironmentVariable("MIN_PORT");
            var port_max = Environment.GetEnvironmentVariable("MAX_PORT");

            if (string.IsNullOrWhiteSpace(port_min) || string.IsNullOrWhiteSpace(port_max))
            {
                return (DEFAULT_PORT_MIN, DEFAULT_PORT_MAX);
            }

            try
            {
                if (!Int32.TryParse(port_min, out int min) || !Int32.TryParse(port_max, out int max))
                {
                    return (DEFAULT_PORT_MIN, DEFAULT_PORT_MAX);
                }

                if (min >= 0 && max >= 0)
                {
                    return (min, max);
                }

                return (DEFAULT_PORT_MIN, DEFAULT_PORT_MAX);
            }
            catch
            {
                return (DEFAULT_PORT_MIN, DEFAULT_PORT_MAX);
            }
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

            string str_ip = requested.Address.MapToIPv4().ToString();

            return await dbContext.Endpoints
                .Where(e =>
                    e.IpAddress == str_ip &&
                    e.Port == requested.Port
                )
                .AnyAsync(ct);
        }
    }

    public static class EndpointProviderCacheConsts
    {

        public static string DefaultAdapter = "DefaultAdapter";

        public static string LoopbackAdapter = "LoopbackAdapter";

        public static string AdapterList = "AdapterList";
    }
}