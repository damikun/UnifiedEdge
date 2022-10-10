using MediatR;
using AutoMapper;
using Server.Mqtt.DTO;
using HotChocolate.Resolvers;
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
            [Service] IMapper mapper,
            IResolverContext context)
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
    }
}