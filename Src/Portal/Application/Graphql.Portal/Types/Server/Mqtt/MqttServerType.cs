using MediatR;
using AutoMapper;
using Server.Manager;
using Aplication.DTO;
using HotChocolate.Resolvers;
using Aplication.CQRS.Queries;
using Aplication.Graphql.Interfaces;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttServer Type 
    /// </summary>
    public class MqttServerType : ObjectType<GQL_MqttServer>
    {
        private readonly IMapper _mapper;

        private readonly IServerManager _manager;

        public MqttServerType(
            IMapper mapper,
            IServerManager manager
        )
        {
            _mapper = mapper;

            _manager = manager;
        }

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttServer> descriptor)
        {
            descriptor.Implements<IServerType>();

            descriptor.ImplementsNode()
            .IdField(t => t.Id)
            .ResolveNodeWith<MqttServerTypeResolvers>(
                e => e.GetMqttServerNode(default!, default!, default!)
            );

            descriptor.Field(e => e.IsConfigMatch)
            .ResolveWith<MqttServerTypeResolvers>(e => e.IsConfigMatch(default!, default!, default!));

            descriptor.Field(e => e.ConfigState)
            .ResolveWith<MqttServerTypeResolvers>(e => e.GetConfigState(default!, default!, default!));

            descriptor.Field(e => e.State)
            .Resolve(async (ctx) =>
            {
                var id = ctx.Parent<GQL_MqttServer>().Id;

                var state = await _manager.State(id);

                return (GQL_ServerState)state;
            });

            descriptor.Field(e => e.Uptime)
            .Type<UptimeType>()
            .Resolve(async (ctx, ct) =>
            {
                var id = ctx.Parent<GQL_MqttServer>().Id;

                return new GQL_Uptime()
                {
                    Uptime = await _manager.ServerUptime(id)
                };
            });
        }

        private class MqttServerTypeResolvers
        {
            public async Task<GQL_MqttServer> GetMqttServerNode(
               string id, // gql Id == Guid on DB side
               IResolverContext ctx,
               CancellationToken cancellationToken)
            {
                IMediator _mediator = ctx.Service<IMediator>();

                var command = new GetMqttServerByGuid()
                {
                    Guid = id
                };

                var response = await _mediator.Send(command, cancellationToken);

                IMapper _mapper = ctx.Service<IMapper>();

                return _mapper.Map<GQL_MqttServer>(response);
            }

            public async Task<bool> IsConfigMatch(
                [Parent] GQL_MqttServer server,
                IResolverContext ctx,
                CancellationToken cancellationToken)
            {

                IMediator _mediator = ctx.Service<IMediator>();

                var command = new GetMqttServerConfigState()
                {
                    Guid = server.Id
                };

                return await _mediator.Send(command, cancellationToken);
            }

            public async Task<GQL_ServerConfigState?> GetConfigState(
            [Parent] GQL_MqttServer server,
            IResolverContext ctx,
            CancellationToken cancellationToken)
            {
                IMediator _mediator = ctx.Service<IMediator>();

                var command = new GetServerConfigState()
                {
                    Guid = server.Id
                };

                try
                {
                    var dto = await _mediator.Send(command, cancellationToken);

                    IMapper _mapper = ctx.Service<IMapper>();

                    return _mapper.Map<GQL_ServerConfigState>(dto);
                }
                catch
                {
                    return null;
                }
            }
        }
    }
}