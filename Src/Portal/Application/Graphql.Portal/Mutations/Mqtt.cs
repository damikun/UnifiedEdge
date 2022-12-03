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
            string userName,
            string password,
            [Service] IMediator mediator,
            [Service] IMapper mapper)
        {
            var response = await mediator.Send(
                new CreateMqttAuthUser()
                {
                    Server_uid = server_uid,
                    UserName = userName,
                    Password = password
                }
            );

            return mapper.Map<GQL_MqttAuthUser>(response);
        }

        /// <summary>
        /// Enable/Disable Auth Client
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_MqttAuthClient> EnableMqttAuthClinet(
            [ID] long authClient_id,
            bool enable,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new EnableMqttAuthClient()
                {
                    AuthClientId = authClient_id,
                    Enable = enable
                },
                cancellationToken
            );

            return _mapper.Map<GQL_MqttAuthClient>(result);
        }

        /// <summary>
        /// Enable/Disable Auth User
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_MqttAuthUser> EnableMqttAuthUser(
            [ID] long authUser_id,
            bool enable,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new EnableMqttAuthUser()
                {
                    AuthUserId = authUser_id,
                    Enable = enable
                },
                cancellationToken
            );

            return _mapper.Map<GQL_MqttAuthUser>(result);
        }

        /// <summary>
        /// Create mqtt Auth Client
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_MqttAuthClient> CreateMqttAuthClient(
            [ID] string server_uid,
            string clientId,
            [Service] IMediator mediator,
            [Service] IMapper mapper)
        {
            var response = await mediator.Send(
                new CreateMqttAuthClient()
                {
                    Server_uid = server_uid,
                    ClientId = clientId
                }
            );

            return mapper.Map<GQL_MqttAuthClient>(response);
        }

        /// <summary>
        /// Remove mqtt Auth Client
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_MqttAuthClient> RemoveMqttAuthClient(
            [ID] long authClientId,
            [Service] IMediator mediator,
            [Service] IMapper mapper)
        {
            var response = await mediator.Send(
                new RemoveMqttAuthClient()
                {
                    AuthClientId = authClientId,
                }
            );

            return mapper.Map<GQL_MqttAuthClient>(response);
        }

        /// <summary>
        /// Remove mqtt Auth User
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_MqttAuthUser> RemoveMqttAuthUser(
            [ID] long authUserId,
            [Service] IMediator mediator,
            [Service] IMapper mapper)
        {
            var response = await mediator.Send(
                new RemoveMqttAuthUser()
                {
                    AuthUserId = authUserId,
                }
            );

            return mapper.Map<GQL_MqttAuthUser>(response);
        }


        /// <summary>
        /// Update mqtt Auth client password
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_MqttAuthUser> SetMqttAuthUserPassword(
            [ID] long authUserId,
            string password,
            [Service] IMediator mediator,
            [Service] IMapper mapper)
        {
            var response = await mediator.Send(
                new SetMqttAuthUserPassword()
                {
                    AuthUserid = authUserId,
                    NewPassword = password
                }
            );

            return mapper.Map<GQL_MqttAuthUser>(response);
        }
    }
}