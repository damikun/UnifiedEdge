using MediatR;
using AutoMapper;
using Server.Mqtt.DTO;
using Aplication.CQRS.Commands;
using Aplication.Graphql.Errors;

namespace Aplication.Graphql.Mutations
{

    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class MqttMutations
    {
        private readonly IMapper _mapper;

        public MqttMutations(IMapper mapper)
        {
            _mapper = mapper;
        }

        /// <summary>
        /// Set server endpoint
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_MqttServerEndpoint> SetMqttServerEndpoint(
            [ID] string server_uid,
            string ip,
            int port,
            [Service] IMediator mediator,
            [Service] IMapper mapper)
        {
            var response = await mediator.Send(
                new SetMqttServerEndpoint()
                {
                    Server_uid = server_uid,
                    Ip = ip,
                    Port = port
                }
            );

            return mapper.Map<GQL_MqttServerEndpoint>(response);
        }

        /// <summary>
        /// Set mqtt client communication timeout
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_MqttServerClientCfg> SetMqttServerClientCommunicationTimeout(
            [ID] string server_uid,
            int timeout_ms,
            [Service] IMediator mediator,
            [Service] IMapper mapper)
        {
            var response = await mediator.Send(
                new SetMqttServerClientComunicationTimeout()
                {
                    Server_uid = server_uid,
                    Timeout_ms = timeout_ms
                }
            );

            return mapper.Map<GQL_MqttServerClientCfg>(response);
        }

        /// <summary>
        /// Set mqtt client MaxPendingMessages
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_MqttServerClientCfg> SetMqttServerClientMaxPendingMessages(
            [ID] string server_uid,
            int maxPendingMessages,
            [Service] IMediator mediator,
            [Service] IMapper mapper)
        {
            var response = await mediator.Send(
                new SetMqttServerClientMaxPendingMessages()
                {
                    Server_uid = server_uid,
                    MaxPendingMessages = maxPendingMessages
                }
            );

            return mapper.Map<GQL_MqttServerClientCfg>(response);
        }

        /// <summary>
        /// Set mqtt client Presist Session
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_MqttServerClientCfg> SetMqttServerClientPresistSession(
            [ID] string server_uid,
            bool presistSession,
            [Service] IMediator mediator,
            [Service] IMapper mapper)
        {
            var response = await mediator.Send(
                new SetMqttServerClientPresistentSession()
                {
                    Server_uid = server_uid,
                    PresistSession = presistSession
                }
            );

            return mapper.Map<GQL_MqttServerClientCfg>(response);
        }

        /// <summary>
        /// Reset mqtt client sttaistic
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_MqttClientStatistics> ResetMqttClientStatistic(
            [ID] string server_uid,
            [ID] string client_uid,
            [Service] IMediator mediator,
            [Service] IMapper mapper)
        {
            var response = await mediator.Send(
                new ResetMqttClientStats()
                {
                    Server_uid = server_uid,
                    Client_uid = client_uid
                }
            );

            return mapper.Map<GQL_MqttClientStatistics>(response);
        }

        /// <summary>
        /// Create mqtt Auth User
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_MqttAuthUser> CreateMqttAuthUser(
            [ID] string server_uid,
            string UserName,
            string Password,
            [Service] IMediator mediator,
            [Service] IMapper mapper)
        {
            var response = await mediator.Send(
                new CreateMqttAuthUser()
                {
                    Server_uid = server_uid,
                    UserName = UserName,
                    Password = Password
                }
            );

            return mapper.Map<GQL_MqttAuthUser>(response);
        }

        /// <summary>
        /// Create mqtt Auth Client
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_MqttAuthClient> CreateMqttAuthClient(
            [ID] string server_uid,
            string ClientId,
            [Service] IMediator mediator,
            [Service] IMapper mapper)
        {
            var response = await mediator.Send(
                new CreateMqttAuthClient()
                {
                    Server_uid = server_uid,
                    ClientId = ClientId
                }
            );

            return mapper.Map<GQL_MqttAuthClient>(response);
        }
    }
}