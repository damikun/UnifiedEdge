using MediatR;
using AutoMapper;
using Aplication.DTO;
using Server.Manager.Mqtt;
using Aplication.Interfaces;
using HotChocolate.Resolvers;
using Aplication.CQRS.Queries;
using HotChocolate.Types.Pagination;

namespace Aplication.Graphql.Queries
{
    /// <summary>
    /// GlobalQueries
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Query)]
    public class GlobalQueries
    {
        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        public GlobalQueries(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<GQL_Adapter?> Testik(
        [ID] string id,
        [Service] IMqttServerManager manager
        )
        {
            return null;
        }

        public async Task<GQL_Adapter> GetAdapterById(
            [ID] string id,
            IResolverContext ctx,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetAdapterById()
                {
                    ID = id
                },
                cancellationToken
            );

            return _mapper.Map<GQL_Adapter>(result);
        }

        [UseConnection(typeof(GQL_Adapter))]
        public async Task<Connection<GQL_Adapter>> GetAdapters(
            IResolverContext ctx,
            [Service] IMediator mediator,
            [Service] ICursorPagination<GQL_Adapter> _cursor_provider,
            CancellationToken cancellationToken)
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetAdapters(arguments),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_Adapter>>(result);
        }

        [UseConnection(typeof(GQL_AdapterLog))]
        public async Task<Connection<GQL_AdapterLog>> GetAdapterLogs(
            IResolverContext ctx,
            [ID] string adapter_id,
            [Service] IMediator mediator,
            [Service] ICursorPagination<GQL_AdapterLog> _cursor_provider,
            CancellationToken cancellationToken
        )
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetAdapterLogs(arguments, adapter_id),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_AdapterLog>>(result);
        }
    }
}