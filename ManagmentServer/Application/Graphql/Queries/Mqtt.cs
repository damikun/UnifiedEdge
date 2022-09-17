using MediatR;
using AutoMapper;
using Aplication.DTO;
using HotChocolate.Resolvers;
using Aplication.CQRS.Queries;
using Aplication.Graphql.Types;
using HotChocolate.Types.Pagination;

namespace Aplication.Graphql.Queries
{
    /// <summary>
    ///  System Queries
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Query)]
    public class MqttQueries
    {
        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        public MqttQueries(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<GQL_MqttServer> GetMqttServerById(
            [ID(nameof(GQL_MqttServer))] string id,
            [Service] IMediator mediator)
        {
            var dto = await mediator.Send(new GetMqttServerByGuid()
            {
                Guid = id
            });

            return _mapper.Map<GQL_MqttServer>(dto);
        }

        public async Task<bool> Test(
            [Service] IMediator mediator)
        {
            // var dto = await mediator.Send(new GetMqttServers()
            // {

            // });

            return true;
        }

        [UseConnection(typeof(MqttServerType))]
        public async Task<Connection<GQL_MqttServer>> GetMqttServers(
            IResolverContext ctx,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetMqttServers(ctx.GetPaggingArguments()),
                cancellationToken
            );

            return new Connection<GQL_MqttServer>(
                _mapper.Map<List<Edge<GQL_MqttServer>>>(result.edges),
                _mapper.Map<ConnectionPageInfo>(result.pageInfo),
                result.pageInfo.TotalCount ?? 0
            );
        }
    }
}