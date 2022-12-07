using MediatR;
using AutoMapper;
using Aplication.DTO;
using Server.Mqtt.DTO;
using HotChocolate.Resolvers;
using Aplication.CQRS.Queries;
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

        [UseConnection(typeof(GQL_MqttClient))]
        public async Task<Connection<GQL_MqttClient>> GetMqttServerClients(
            [ID] string server_uid,
            IResolverContext ctx,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetMqttServerClients(arguments, server_uid),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_MqttClient>>(result);
        }

        [UseConnection(typeof(GQL_MqttMessage))]
        public async Task<Connection<GQL_MqttMessage>> GetMqttServerRecentMessages(
        [ID] string server_uid,
        [ID] string? topic_uid,
        [ID] string? client_uid,
        IResolverContext ctx,
        [Service] IMediator mediator,
        CancellationToken cancellationToken)
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetMqttServerRecentMessages(
                    arguments,
                    server_uid,
                    client_uid,
                    topic_uid),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_MqttMessage>>(result);
        }

        public async Task<GQL_MqttMessage?> GetMqttServerMessageById(
        [ID] string server_uid,
        [ID] string message_uid,
        IResolverContext ctx,
        [Service] IMediator mediator,
        CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetMqttServerMessageById(server_uid, message_uid),
                cancellationToken
            );

            return _mapper.Map<GQL_MqttMessage>(result);
        }

        [UseConnection(typeof(GQL_MqttMessage))]
        public async Task<Connection<GQL_MqttMessage>> GetMqttServerTopicRecentMessages(
            [ID] string server_uid,
            IResolverContext ctx,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetMqttServerTopicRecentMessages(arguments, server_uid),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_MqttMessage>>(result);
        }

        [UseConnection(typeof(GQL_MqttMessage))]
        public async Task<Connection<GQL_MqttMessage>> GetMqttServerClientRecentMessages(
            [ID] string server_uid,
            IResolverContext ctx,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetMqttServerClientRecentMessages(arguments, server_uid),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_MqttMessage>>(result);
        }

        [UseConnection(typeof(GQL_MqttClientSession))]
        public async Task<Connection<GQL_MqttClientSession>> GetMqttServerSessions(
            [ID] string server_uid,
            IResolverContext ctx,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetMqttServerSessions(arguments, server_uid),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_MqttClientSession>>(result);
        }

        public async Task<GQL_MqttClientSession> GetMqttServerClientSession(
            [ID] string server_uid,
            [ID] string server_client_uid,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetMqttServerClientSession()
                {
                    server_uid = server_uid,
                    server_client_uid = server_client_uid
                },
                cancellationToken
            );

            return _mapper.Map<GQL_MqttClientSession>(result);
        }

        public async Task<GQL_MqttClientStatistics?> GetMqttServerClientStatistic(
            [ID] string server_uid,
            [ID] string server_client_uid,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetMqttServerClientStatistics()
                {
                    server_uid = server_uid,
                    server_client_uid = server_client_uid
                },
                cancellationToken
            );

            return _mapper.Map<GQL_MqttClientStatistics>(result);
        }

        public async Task<GQL_MqttClient> GetMqttServerClient(
            [ID] string server_uid,
            [ID] string server_client_uid,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetMqttServerClientById(server_uid, server_client_uid),
                cancellationToken
            );

            return _mapper.Map<GQL_MqttClient>(result);
        }

        public async Task<GQL_MqttServerEndpoint> GetMqttServerEndpoint(
            [ID] string server_uid,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetMqttServerEndpoint(server_uid),
                cancellationToken
            );

            return _mapper.Map<GQL_MqttServerEndpoint>(result);
        }

        public async Task<GQL_MqttServerStats> GetMqttServerStats(
            [ID] string server_uid,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetMqttServerStatistics(server_uid),
                cancellationToken
            );

            return _mapper.Map<GQL_MqttServerStats>(result);
        }

        [UseConnection(typeof(GQL_MqttTopic))]
        public async Task<Connection<GQL_MqttTopic>> GetMqttServerTopics(
            [ID] string server_uid,
            IResolverContext ctx,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetMqttServerTopics(arguments, server_uid),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_MqttTopic>>(result);
        }

        public async Task<GQL_MqttServerClientCfg> GetMqttServerClientConfig(
            [ID] string server_uid,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetMqttServerClientConfig(server_uid),
                cancellationToken
            );

            return _mapper.Map<GQL_MqttServerClientCfg>(result);
        }

        public async Task<GQL_MqttAuthClient> GetMqttAuthClientById(
            [ID] long authClient_id,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetMqttServerAuthClientById(authClient_id),
                cancellationToken
            );

            return _mapper.Map<GQL_MqttAuthClient>(result);
        }

        public async Task<GQL_MqttAuthUser> GetMqttAuthUserById(
            [ID] long authUser_id,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetMqttServerAuthUserById(authUser_id),
                cancellationToken
            );

            return _mapper.Map<GQL_MqttAuthUser>(result);
        }

        [UseConnection(typeof(GQL_MqttAuthUser))]
        public async Task<Connection<GQL_MqttAuthUser>> GetMqttAuthUsers(
        [ID] string server_uid,
        IResolverContext ctx,
        [Service] IMediator mediator,
        CancellationToken cancellationToken)
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetMqttServerAuthUsers(arguments, server_uid),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_MqttAuthUser>>(result);
        }

        [UseConnection(typeof(GQL_MqttAuthClient))]
        public async Task<Connection<GQL_MqttAuthClient>> GetMqttAuthClients(
        [ID] string server_uid,
        IResolverContext ctx,
        [Service] IMediator mediator,
        CancellationToken cancellationToken)
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetMqttServerAuthClients(arguments, server_uid),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_MqttAuthClient>>(result);
        }

        public async Task<GQL_MqttAuthCfg> GetMqttServerAuthCfg(
        [ID] string server_uid,
        [Service] IMediator mediator,
        CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetMqttServerAuthCfg()
                {
                    ServerUid = server_uid
                },
                cancellationToken
            );

            return _mapper.Map<GQL_MqttAuthCfg>(result);
        }

        [UseConnection(typeof(GQL_MqttAuthLog))]
        public async Task<Connection<GQL_MqttAuthLog>> GetMqttAuthLogs(
        [ID] string server_uid,
        [ID] string? auth_client_id,
        [ID] string? auth_user_id,
        IResolverContext ctx,
        [Service] IMediator mediator,
        CancellationToken cancellationToken)
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetMqttServerAuthLogs(arguments, server_uid),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_MqttAuthLog>>(result);
        }

        public async Task<GQL_MqttAuthLog> GetMqttAuthLogById(
            [ID] long log_id,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetMqttServerAuthLogById()
                {
                    log_id = log_id
                },
                cancellationToken
            );

            return _mapper.Map<GQL_MqttAuthLog>(result);
        }
    }
}