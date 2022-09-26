using AutoMapper;
using Aplication.DTO;
using System.Net.NetworkInformation;

namespace Aplication.Mapping
{
    public class Internall_Profile : Profile
    {
        public Internall_Profile()
        {
            CreateMap(typeof(OperationalStatus), typeof(AdapterState))
                .ConvertUsing(typeof(AdapterStateMap));
        }

        public class AdapterStateMap
          : ITypeConverter<OperationalStatus, AdapterState>
        {
            public AdapterState Convert(
                OperationalStatus source,
                AdapterState destination,
                ResolutionContext context
            )
            {
                switch (source)
                {
                    case OperationalStatus.Up:
                        return AdapterState.UP;

                    case OperationalStatus.Testing:
                    case OperationalStatus.Dormant:
                    case OperationalStatus.Down:
                    case OperationalStatus.LowerLayerDown:
                        return AdapterState.DOWN;
                    default:
                        return AdapterState.UNKNOWN;
                }

            }
        }
    }
}