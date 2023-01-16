using Server;
using MediatR;
using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using HotChocolate.Resolvers;
using Aplication.CQRS.Commands;
using Aplication.Graphql.Errors;
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
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
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

            return _mapper.Map<GQL_IServer>(dto);
        }

        /// <summary>
        /// Process server cmd
        /// </summary>
        /// <returns>bool</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
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

        /// <summary>
        /// Process server group cmd
        /// </summary>
        /// <returns>bool</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_ServerGroupResult> ProcessServerGroupCmd(
            GQL_ServerGroupCmd cmd,
            [Service] IMediator mediator,
            [Service] IMapper mapper,
            IResolverContext context)
        {
            var result = await mediator.Send(
                new ProcessServerGroupCmd()
                {
                    Command = (ServerGroupCmd)cmd
                }
            );

            return (GQL_ServerGroupResult)result;
        }

        public class RemoveServerData
        {
            public string removed_id { get; set; }

            public string typeName { get; set; }

        }

        /// <summary>
        /// Remove server
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<RemoveServerData> RemoveServer(
            [ID] string id,
            [Service] IMediator mediator,
            [Service] IMapper mapper,
            IResolverContext context)
        {
            var removed_server_dto = await mediator.Send(
                new RemoveServer()
                {
                    UID = id
                }
            );

            var gql_dto = mapper.Map<GQL_ServerBase>(removed_server_dto);

            return new RemoveServerData()
            {
                removed_id = gql_dto.Id,
                typeName = gql_dto.GetType().Name
            };
        }


        /// <summary>
        /// Set server Name
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_IServer> SetServerName(
            [ID] string id,
            string name,
            [Service] IMediator mediator,
            [Service] IMapper mapper,
            IResolverContext context)
        {
            var dto = await mediator.Send(
                new SetServerName()
                {
                    UID = id,
                    Name = name
                }
            );

            return mapper.Map<GQL_IServer>(dto.server);
        }


        /// <summary>
        /// Set server Description
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_IServer> SetServerDescription(
            [ID] string id,
            string description,
            [Service] IMediator mediator,
            [Service] IMapper mapper,
            IResolverContext context
        )
        {
            var dto = await mediator.Send(
                new SetServerDescription()
                {
                    UID = id,
                    Description = description
                }
            );

            return mapper.Map<GQL_IServer>(dto.server);
        }

        /// <summary>
        /// Set server Location
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_IServer> SetServerLocation(
            [ID] string id,
            string location,
            [Service] IMediator mediator,
            [Service] IMapper mapper,
            IResolverContext context)
        {
            var dto = await mediator.Send(
                new SetServerLocation()
                {
                    UID = id,
                    Location = location
                }
            );

            return mapper.Map<GQL_IServer>(dto);
        }

        /// <summary>
        /// Set server enabled/disabled
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_IServer> EnableDisableServer(
            [ID] string id,
            bool enable,
            [Service] IMediator mediator,
            [Service] IMapper mapper,
            IResolverContext context)
        {
            var server = await mediator.Send(
                new EnableDisableServer()
                {
                    UID = id,
                    Enable = enable
                }
            );

            return mapper.Map<GQL_IServer>(server);
        }
    }
}
