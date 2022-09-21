using Server;
using MediatR;
using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using HotChocolate.Resolvers;
using Aplication.CQRS.Commands;
using Aplication.Graphql.Interfaces;

namespace Aplication.Graphql.Mutations
{
    /// <summary>
    /// Server Mutations
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class ServerMutations
    {

        private readonly IMapper _mapper;

        public ServerMutations(IMapper mapper)
        {
            _mapper = mapper;
        }

        public class CreateServerInput
        {

#nullable disable
            /// <summary> Name </summary>
            public string Name { get; set; }
#nullable enable

            /// <summary> Description </summary>
            public string? Description { get; set; }

            /// <summary> Server Type </summary>
            public GQL_ServerVariant Type { get; set; }

        }

        /// <summary>
        /// Creates new server
        /// </summary>
        /// <returns>GQL_IServer</returns>
        public async Task<GQL_IServer> CreateServer(
            CreateServerInput request,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var dto = await mediator.Send(new CreateServer()
            {
                Name = request.Name,
                Description = request.Description,
                Type = (ServerType)request.Type
            });

            return _mapper.Map<GQL_MqttServer>(dto);
        }

        /// <summary>
        /// Process server cmd
        /// </summary>
        /// <returns>bool</returns>
        public async Task<GQL_ServerState> ProcessServerCmd(
            [ID] string uid,
            GQL_ServerCmd cmd,
            [Service] IMediator mediator,
            [Service] IMapper mapper,
            IResolverContext context)
        {
            var state = await mediator.Send(
                new ProcessServerCmd()
                {
                    Command = (ServerCmd)cmd,
                    UID = uid
                }
            );

            return (GQL_ServerState)state;
        }


        public class RemoveServerPayload
        {
            public string removed_id { get; set; }

            public string typeName { get; set; }

        }

        /// <summary>
        /// Remove server
        /// </summary>
        public async Task<RemoveServerPayload> RemoveServer(
            [ID] string uid,
            [Service] IMediator mediator,
            [Service] IMapper mapper,
            IResolverContext context)
        {
            var removed_server_dto = await mediator.Send(
                new RemoveServer()
                {
                    UID = uid
                }
            );

            var gql_dto = mapper.Map<GQL_ServerBase>(removed_server_dto);

            return new RemoveServerPayload()
            {
                removed_id = gql_dto.Id,
                typeName = gql_dto.GetType().Name
            };
        }

    }
}
