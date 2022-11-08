using System.Diagnostics;
using System.Diagnostics.Metrics;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;

namespace Aplication.Services
{
    public enum Protocol
    {
        http,
        https,
    }

    public readonly record struct CpuMetrics(
        double TotalCpuUsed,
        double PrivilegedCpuUsed,
        double UserCpuUsed,
        double ThreadCount
    );

    public readonly record struct MemoryMetrics(
        double MemoryUssage,
        double GetAlocatedMemory,
        double VirtualMemory,
        double PagedMemory,
        double NonPagedMemory,
        double MemoryWorkingSet
    );

    public readonly record struct SystemInfo(
        string ProcessName,
        string MachineName,
        ICollection<string> AppUrls,
        OperatingSystem OsVersion,
        string TargetFramework
    );

    public class RuntimeService : IRuntimeService
    {
        private readonly IServer Server;

        public const string Name = "RuntimeService";

        private readonly int MainProcessId = Environment.ProcessId;

        private static readonly Meter RuntimeMeter = new(Name, "1.0");

        private Process MainProcess { get { return GetProcessById(MainProcessId); } }

        public const string http_regex = @"(http)?:\/\/(\S+)";
        public const string https_regex = @"(https)?:\/\/(\S+)";

        static RuntimeService()
        {
            InstanceDt = DateTime.Now;
        }

        public RuntimeService(
            IServer server)
        {
            Server = server;
        }

        private Process GetProcessById(int id)
        {
            return Process.GetProcessById(id);
        }

        public MemoryMetrics GetMemoryMetrics()
        {
            return new MemoryMetrics()
            {
                MemoryUssage = RuntimeCollector.Record.PrivateMemory,
                GetAlocatedMemory = RuntimeCollector.Record.GCAlocatedMemory,
                VirtualMemory = RuntimeCollector.Record.VirtualMemory,
                PagedMemory = RuntimeCollector.Record.PagedMemory,
                NonPagedMemory = RuntimeCollector.Record.NonPagedSystemMemory,
                MemoryWorkingSet = RuntimeCollector.Record.MemoryWorkingSet,
            };
        }

        public CpuMetrics GetCpuMetrics()
        {
            return new CpuMetrics()
            {
                TotalCpuUsed = RuntimeCollector.Record.TotalCpuUsed,
                PrivilegedCpuUsed = RuntimeCollector.Record.PrivilegedCpuUsed,
                UserCpuUsed = RuntimeCollector.Record.UserCpuUsed,
                ThreadCount = RuntimeCollector.Record.ThreadCount
            };
        }

        private SystemInfo? _sys_info = null;

        public SystemInfo GetSystemInfo()
        {
            if (_sys_info == null)
            {
                _sys_info = new SystemInfo()
                {
                    ProcessName = GetProcessById(MainProcessId).ProcessName,
                    MachineName = Environment.MachineName,
                    AppUrls = GetApplicationUrls(null),
                    OsVersion = Environment.OSVersion,
                    TargetFramework = GetTargetFramework()
                };
            }

            return (SystemInfo)_sys_info;
        }

        public ICollection<string> GetApplicationUrls(Protocol? protocol = Protocol.https)
        {

            var list = Server?.Features.Get<IServerAddressesFeature>();

            var result = list?.Addresses ?? Array.Empty<string>();

            if (result == null)
            {
                return new List<string>();
            }

            if (protocol != null)
            {
                var regex = new Regex(protocol == Protocol.http ? http_regex : https_regex);

                return result.Where(e => e != null)
                .Where(e => regex.IsMatch(e))?
                .Distinct()
                .ToList() ?? new List<string>();
            }
            else
            {
                return result.Where(e => e != null)
                .Distinct()
                .ToList() ?? new List<string>();
            }
        }

        private string GetTargetFramework()
        {
#if NET452
                return "net452";
#elif NET461
                return "net461";
#elif NET472
                return "net472";
#elif NETSTANDARD1_3
                return "netstandard1.3";
#elif NETSTANDARD2_0
                return "netstandard2.0";
#elif NETSTANDARD2_1
                return "netstandard2.1";
#elif WINDOWS_UWP
                return "uap10.0";
#elif NETCOREAPP3_1
                return "netcoreapp3.1";
#elif NET5_0
                return "net5.0";
#elif NET6_0
            return "net7.0";
#elif NET7_0
                return "net7.0";
#endif
        }

        private static DateTime InstanceDt = DateTime.Now;

        public TimeSpan Uptime => DateTime.Now.AddSeconds(1).Subtract(InstanceDt);
    }
}