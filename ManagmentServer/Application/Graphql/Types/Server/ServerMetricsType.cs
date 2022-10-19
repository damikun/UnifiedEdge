using AutoMapper;
using Aplication.DTO;
using Aplication.Services;
using Aplication.Services.Historian;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql ServerMetricsType
    /// </summary>
    public class ServerMetricsType : ObjectType<GQL_ServerMetric>
    {
        private readonly IRuntimeService _runtime;

        private readonly IMapper _mapper;

        private readonly IHistorian _historian;

        public ServerMetricsType(
            IRuntimeService runtime,
            IMapper mapper,
            IHistorian historian)
        {
            _runtime = runtime;
            _mapper = mapper;
            _historian = historian;
        }

        protected override void Configure(IObjectTypeDescriptor<GQL_ServerMetric> descriptor)
        {
            descriptor
            .Field(e => e.Id)
            .ID();

            descriptor
            .Field(e => e.Value)
            .Type<AnyType>();
        }
    }
}