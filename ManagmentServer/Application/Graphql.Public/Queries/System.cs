using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Services;
using Aplication.CQRS.Queries;

namespace Aplication.Graphql.Queries
{

    /// <summary>
    /// PublicSystemQueries
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Query)]
    public class PublicSystemQueries
    {
        /// <summary>
        /// Injected <c>IRuntimeService</c>
        /// </summary>
        private readonly IRuntimeService _runtime;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        public PublicSystemQueries(IRuntimeService runtime, IMapper mapper)
        {
            _runtime = runtime;

            _mapper = mapper;
        }

        /// <summary>
        /// Return RuntimeMetrics object
        /// </summary>
        /// <returns>GQL_RuntimeMetrics</returns>
        public GQL_RuntimeMetrics RuntimeMetrics() => new GQL_RuntimeMetrics();

        /// <summary>
        /// Return system info
        /// </summary>
        /// <returns>SystemInfo</returns>
        public GQL_SystemInfo SystemInfo() => new GQL_SystemInfo();

        /// <summary>
        /// Returns edge informations
        /// </summary>
        /// <returns>Returns GQL_Edge</returns>
        public async Task<GQL_Edge> EdgeInfo(
            [Service] IMediator mediator)
        {
            var dto = await mediator.Send(new GetEdgeInfo());

            return _mapper.Map<GQL_Edge>(dto);
        }

        /// <summary>
        /// Get default adapter
        /// </summary>
        /// <returns>Returns GQL_DefaultAdapter</returns>
        public async Task<GQL_DefaultAdapter> GetDefaultAdapter(
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetDefaultAdapter(),
                cancellationToken
            );

            return new GQL_DefaultAdapter()
            {
                Adapter = _mapper.Map<GQL_Adapter?>(result)
            };
        }
    }
}