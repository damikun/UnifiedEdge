using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Interfaces;
using HotChocolate.Resolvers;
using Aplication.CQRS.Queries;
using Aplication.Graphql.Interfaces;
using HotChocolate.Types.Pagination;
using Server.Manager.Mqtt;
using Aplication.Events.Server;
using Server;

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

            return _mapper.Map<Connection<GQL_IServer>>(result);
        }

        public async Task<GQL_Adapter?> Testik(
        [ID] string id,
        [Service] IMqttServerManager manager
        )
        {
            var ssss = new ServerGenericEventNotification<ServerStateChangedEvent>(new ServerStateChangedEvent());

            System.Console.WriteLine("*************************");
            System.Console.WriteLine(ssss.GetType().Name);
            System.Console.WriteLine(ssss.GetType().FullName);
            System.Console.WriteLine("*************************");

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