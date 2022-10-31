using AutoMapper;
using Aplication.DTO;
using Aplication.Services;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql SystemInfoType
    /// </summary>
    public class SystemInfoType : ObjectType<GQL_SystemInfo>
    {
        /// <summary>
        /// Injected <c>IRuntimeService</c>
        /// </summary>
        private readonly IRuntimeService _runtime;

        /// <summary>
        /// Local extracted variable <c>SystemInfo</c>
        /// </summary>
        private readonly SystemInfo _sysInfo;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        public SystemInfoType(
            IRuntimeService runtime,
            IMapper mapper)
        {
            _runtime = runtime;

            _sysInfo = _runtime.GetSystemInfo();

            _mapper = mapper;
        }

        protected override void Configure(IObjectTypeDescriptor<GQL_SystemInfo> descriptor)
        {
            descriptor.Field(e => e.Id).ID()
                .Resolve(e => "SystemInfo");

            descriptor.Field(e => e.Uptime)
                .Type<UptimeType>()
                .Resolve((ctx, ct) => GetUptime());

            descriptor.Field(e => e.ServerDateTime)
                .Resolve((ctx, ct) => DateTime.Now);

            descriptor.Field(e => e.ProcessName)
                .Resolve(e => _sysInfo.ProcessName);

            descriptor.Field(e => e.MachineName)
                .Resolve(e => _sysInfo.MachineName);

            descriptor.Field(e => e.AppUrls)
                .Resolve(e => _sysInfo.AppUrls);

            descriptor.Field(e => e.OsVersion)
                .Resolve(e => new GQL_OS());

            descriptor.Field(e => e.TargetFramework)
                .Resolve(e => _sysInfo.TargetFramework);
        }

        private GQL_Uptime GetUptime()
        {
            return new GQL_Uptime()
            {
                Uptime = _runtime.Uptime
            };
        }
    }
}