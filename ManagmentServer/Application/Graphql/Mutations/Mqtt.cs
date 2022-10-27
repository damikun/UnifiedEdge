using MediatR;
using AutoMapper;
using Server.Mqtt.DTO;
using Aplication.CQRS.Commands;

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
    }
}