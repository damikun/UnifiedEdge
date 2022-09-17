using MediatR;
using AutoMapper;
using Aplication.DTO;
using Server.Manager;
using Aplication.CQRS.Commands;

namespace Aplication.Graphql.Mutations
{

    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class MqttMutations
    {

        private readonly IMapper _mapper;
        public MqttMutations(
            IMapper mapper)
        {
            _mapper = mapper;
        }

        /// <summary>
        /// Crate  Mqtt Server Input object
        /// </summary>
        public class CreateMqttServerInput
        {

#nullable disable
            /// <summary> Name </summary>
            public string Name { get; set; }

#nullable enable

            /// <summary> Description </summary>
#nullable enable
            public string? Description { get; set; }
#nullable disable

            /// <summary> Port </summary>
            public int Port { get; set; }
        }

        /// <summary>
        /// Create new Mqtt Server
        /// </summary>
        /// <returns>DTO_MqttServer</returns>
        public async Task<GQL_MqttServer> CreateMqttServer(
             CreateMqttServerInput request,
             [Service] IMediator mediator)
        {
            var dto = await mediator.Send(new CreateMqttServer()
            {
                Name = request.Name,
                Description = request.Description,
                Port = request.Port
            });

            return _mapper.Map<GQL_MqttServer>(dto);
        }

        /// <summary>
        /// Remove Mqtt Server Input object
        /// </summary>
        public class RemoveServerInput
        {

#nullable disable
            /// <summary> Id </summary>
            public string Id { get; set; }
#nullable enable

        }

        /// <summary>
        /// Remove new Mqtt Server
        /// </summary>
        /// <returns>Removed Id</returns>
        public async Task<string> RemoveMqttServer(
             RemoveServerInput request,
             [Service] IMediator mediator)
        {
            return await mediator.Send(new RemoveMqttServer()
            {
                Id = request.Id,
            });
        }
    }
}