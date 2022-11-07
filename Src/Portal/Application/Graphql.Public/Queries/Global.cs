using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Interfaces;
using HotChocolate.Resolvers;
using Aplication.CQRS.Queries;
using HotChocolate.Types.Pagination;

namespace Aplication.Graphql.Queries
{
    /// <summary>
    /// PublicGlobalQueries
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Query)]
    public class PublicGlobalQueries
    {
        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        public PublicGlobalQueries(IMapper mapper)
        {
            _mapper = mapper;
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

    }
}