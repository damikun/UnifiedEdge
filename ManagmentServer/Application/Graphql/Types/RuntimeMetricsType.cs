using AutoMapper;
using Aplication.DTO;
using Aplication.Services;
using Aplication.Services.Historian;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql RuntimeMetricsType
    /// </summary>
    public class RuntimeMetricsType : ObjectType<GQL_RuntimeMetrics>
    {
        private readonly IRuntimeService _runtime;

        private readonly IMapper _mapper;

        private readonly IHistorian _historian;

        public RuntimeMetricsType(
            IRuntimeService runtime,
            IMapper mapper,
            IHistorian historian)
        {
            _runtime = runtime;
            _mapper = mapper;
            _historian = historian;
        }

        protected override void Configure(IObjectTypeDescriptor<GQL_RuntimeMetrics> descriptor)
        {
            descriptor.Field(e => e.CpuMetrics)
                .Resolve(e => _mapper.Map<GQL_CpuMetrics>(_runtime.GetCpuMetrics()));

            descriptor.Field(e => e.MemoryMetrics)
                .Resolve(e => _mapper.Map<GQL_MemoryMetrics>(_runtime.GetMemoryMetrics()));

            descriptor.Field(e => e.MetricHistory)
                .Argument("name", e => e.Type<RuntimeMetricsSourceType>())
                .Type<ListType<HistorianRecordType>>()
                .Resolve(ctx =>
                {

                    Thread.Sleep(10000);
                    var name = ctx.ArgumentValue<GQL_RuntimeMetricSource>("name");

                    var name_string = $"{RuntimeCollector.Prefix}.{name}";

                    var collected_data = _historian.Get<IConvertible>(name_string);

                    //Last 30 seconds
                    var span = DateTime.Now.Subtract(TimeSpan.FromSeconds(180));

                    return collected_data.Where(e => e.TimeStamp > span);
                });
        }
    }
}