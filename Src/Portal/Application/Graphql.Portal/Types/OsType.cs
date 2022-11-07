using Aplication.DTO;
using Aplication.Services;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql OsType
    /// </summary>
    public class OsType : ObjectType<GQL_OS>
    {
        private readonly IRuntimeService _service;

        private readonly OperatingSystem _os_info;

        public OsType(IRuntimeService service)
        {
            _service = service;

            _os_info = service.GetSystemInfo().OsVersion;
        }

        protected override void Configure(IObjectTypeDescriptor<GQL_OS> descriptor)
        {
            descriptor.Field(e => e.Platform).Resolve(() =>
            {
                return _os_info.Platform;
            });

            descriptor.Field(e => e.Version).Resolve(() =>
            {
                return _os_info.VersionString;
            });

            descriptor.Field(e => e.IsBrowser).Resolve(() =>
            {
                return OperatingSystem.IsBrowser();
            });
        }

    }
}