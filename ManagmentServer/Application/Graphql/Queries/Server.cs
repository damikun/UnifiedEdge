using MediatR;
using AutoMapper;
using Aplication.Interfaces;
using HotChocolate.Resolvers;
using Aplication.CQRS.Queries;
using Aplication.Graphql.Interfaces;
using HotChocolate.Types.Pagination;

namespace Aplication.Graphql.Queries
{
    /// <summary>
    /// ServerQueries
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Query)]
    public class ServerQueries
    {

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        public ServerQueries(IMapper mapper)
        {
            _mapper = mapper;
        }

        [UseConnection(typeof(GQL_IServer))]
        public async Task<Connection<GQL_IServer>> GetServers(
            IResolverContext ctx,
            [Service] IMediator mediator,
            [Service] ICursorPagination<GQL_IServer> _cursor_provider,
            CancellationToken cancellationToken)
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetServers(arguments),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_IServer>>(result);
        }

        [UseConnection(typeof(GQL_IServerEventUnion))]
        public async Task<Connection<GQL_IServerEventUnion>> GetServerLogs(
            [ID] string server_id,
            IResolverContext ctx,
            [Service] IMediator mediator,
            [Service] ICursorPagination<GQL_IServer> _cursor_provider,
            CancellationToken cancellationToken)
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetServerLogs(arguments, server_id),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_IServerEventUnion>>(result);
        }
    }
}