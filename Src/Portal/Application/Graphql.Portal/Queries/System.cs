using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Services;
using HotChocolate.Resolvers;
using Aplication.CQRS.Queries;
using HotChocolate.Types.Pagination;

namespace Aplication.Graphql.Queries
{

    /// <summary>
    /// System Queries
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Query)]
    public class SystemQueries
    {
        /// <summary>
        /// Injected <c>IRuntimeService</c>
        /// </summary>
        private readonly IRuntimeService _runtime;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        public SystemQueries(IRuntimeService runtime, IMapper mapper)
        {
            _runtime = runtime;

            _mapper = mapper;
        }

        /// <summary>
        /// Return RuntimeMetrics object
        /// </summary>
        /// <returns>GQL_RuntimeMetrics</returns>
        public async Task<GQL_RuntimeMetrics> RuntimeMetrics()
        {
            await Task.Delay(7000);

            return new GQL_RuntimeMetrics();
        }

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
        /// Returns system logs connection
        /// </summary>
        /// <returns>Returns GQL_SystemEvent connection</returns>
        [UseConnection(typeof(GQL_SystemEvent))]
        public async Task<Connection<GQL_SystemEvent>> GetSystemLogs(
            IResolverContext ctx,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetSystemLogs(arguments),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_SystemEvent>>(result);
        }

        /// <summary>
        /// Returns system log
        /// </summary>
        /// <returns>Returns GQL_SystemEvent</returns>
        public async Task<GQL_SystemEvent> GetSystemLogById(
            [ID] long log_id,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetSystemLogById(log_id),
                cancellationToken
            );

            return _mapper.Map<GQL_SystemEvent>(result);
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