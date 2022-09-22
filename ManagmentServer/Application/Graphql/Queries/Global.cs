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

            IEnumerable<GQL_IServer> mqtt_edges = result.edges
            .Where(e => e != null)
            .Select(e =>
                _mapper.Map<GQL_IServer>(e.Node)
            );

            var pagination_result = await _cursor_provider
                .ApplyQueriablePagination(
                    mqtt_edges.AsQueryable(),
                    arguments,
                    (ct) => Task.FromResult(mqtt_edges.Count()),
                    cancellationToken
            );

            return new Connection<GQL_IServer>(
                _mapper.Map<List<Edge<GQL_IServer>>>(pagination_result.edges),
                _mapper.Map<ConnectionPageInfo>(pagination_result.pageInfo),
                pagination_result.pageInfo.TotalCount ?? 0
            );
        }
    }
}