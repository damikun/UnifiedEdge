using AutoMapper;
using Aplication.DTO;
using Aplication.Services;

namespace Aplication.Mapping
{
    public class Metrics_Map_Profile : Profile
    {
        public Metrics_Map_Profile()
        {

            CreateMap<CpuMetrics, GQL_CpuMetrics>()
                .IncludeAllDerived()
                .ForMember(dest => dest.PrivilegedCpuUsed, opt => opt.MapFrom(src => src.PrivilegedCpuUsed))
                .ForMember(dest => dest.ThreadCount, opt => opt.MapFrom(src => src.ThreadCount))
                .ForMember(dest => dest.TotalCpuUsed, opt => opt.MapFrom(src => src.TotalCpuUsed))
                .ForMember(dest => dest.UserCpuUsed, opt => opt.MapFrom(src => src.UserCpuUsed))
                .ReverseMap();

            CreateMap<MemoryMetrics, GQL_MemoryMetrics>()
                .IncludeAllDerived()
                .ForMember(dest => dest.GetAlocatedMemory, opt => opt.MapFrom(src => src.GetAlocatedMemory))
                .ForMember(dest => dest.MemoryUssage, opt => opt.MapFrom(src => src.MemoryUssage))
                .ForMember(dest => dest.MemoryWorkingSet, opt => opt.MapFrom(src => src.MemoryWorkingSet))
                .ForMember(dest => dest.NonPagedMemory, opt => opt.MapFrom(src => src.NonPagedMemory))
                .ForMember(dest => dest.PagedMemory, opt => opt.MapFrom(src => src.PagedMemory))
                .ForMember(dest => dest.VirtualMemory, opt => opt.MapFrom(src => src.VirtualMemory))
                .ReverseMap();

            CreateMap<SystemInfo, GQL_SystemInfo>()
                .IncludeAllDerived()
                .ForMember(dest => dest.AppUrls, opt => opt.MapFrom(src => src.AppUrls))
                .ForMember(dest => dest.MachineName, opt => opt.MapFrom(src => src.MachineName))
                .ForMember(dest => dest.OsVersion, opt => opt.MapFrom(src => src.OsVersion))
                .ForMember(dest => dest.ProcessName, opt => opt.MapFrom(src => src.ProcessName))
                .ForMember(dest => dest.TargetFramework, opt => opt.MapFrom(src => src.TargetFramework))
                .ReverseMap();

            CreateMap<GQL_RuntimeMetricSource, string>()
                .ConvertUsing(typeof(MetricSourceToDomainSource));

        }
    }


    public class MetricSourceToDomainSource
    : ITypeConverter<GQL_RuntimeMetricSource, string>
    {
        public string Convert(
            GQL_RuntimeMetricSource source,
            string destination,
            ResolutionContext context)
        {

            switch (source)
            {
                case GQL_RuntimeMetricSource.TotalCpuUsed: return RuntimeMetricsConst.TotalCpuUsed;
                case GQL_RuntimeMetricSource.PrivilegedCpuUsed: return RuntimeMetricsConst.PrivilegedCpuUsed;
                case GQL_RuntimeMetricSource.UserCpuUsed: return RuntimeMetricsConst.UserCpuUsed;
                case GQL_RuntimeMetricSource.MemoryWorkingSet: return RuntimeMetricsConst.MemoryWorkingSet;
                case GQL_RuntimeMetricSource.NonPagedSystemMemory: return RuntimeMetricsConst.NonPagedSystemMemory;
                case GQL_RuntimeMetricSource.PagedMemory: return RuntimeMetricsConst.PagedMemory;
                case GQL_RuntimeMetricSource.PagedSystemMemory: return RuntimeMetricsConst.PagedSystemMemory;
                case GQL_RuntimeMetricSource.PrivateMemory: return RuntimeMetricsConst.PrivateMemory;
                case GQL_RuntimeMetricSource.VirtualMemory: return RuntimeMetricsConst.VirtualMemory;
                case GQL_RuntimeMetricSource.GCAlocatedMemory: return RuntimeMetricsConst.GCAlocatedMemory;
                case GQL_RuntimeMetricSource.ThreadCount: return RuntimeMetricsConst.ThreadCount;
                default: throw new Exception("Unsupported source");
            }
        }
    }

}