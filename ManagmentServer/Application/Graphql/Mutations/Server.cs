using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using HotChocolate.Resolvers;
using Aplication.CQRS.Queries;
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

        public ServerMutations(
            IMapper mapper)
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
            [Service] IMediator mediator)
        {
            ICommandCore? cmd = GetServerCreateCmd(request);

            var dto = await mediator.Send(cmd!);

            return _mapper.Map<GQL_MqttServer>(dto);
        }

        public async Task<bool> ServerCmd(
            [ID] string uid,
            GQL_ServerCmd cmd,
            [Service] IMediator mediator,
            IResolverContext context)
        {
            var server_db = await mediator.Send(
                new GetServer()
                {
                    Guid = uid!
                }
            );

            return true;
        }

        [GraphQLIgnore]
        private CommandCore? GetServerCreateCmd(CreateServerInput request)
        {
            switch (request.Type)
            {
                case GQL_ServerVariant.mqtt:
                    return new CreateMqttServer()
                    {
                        Name = request.Name,
                        Description = request.Description,
                    };

                case GQL_ServerVariant.opc:
                    return new CreateOpcServer()
                    {
                        Name = request.Name,
                        Description = request.Description,
                    };

                default: return null;
            }
        }
    }
}
