using MediatR;
using AutoMapper;
using Aplication.DTO;
using Server.Manager.Mqtt;
using HotChocolate.Resolvers;
using Aplication.CQRS.Queries;
using Aplication.Graphql.Interfaces;
using Server.Manager;
using Server.Mqtt;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttServer Type converter
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

            descriptor.Field(e => e.State)
            .Resolve((ctx) =>
            {
                var id = ctx.Parent<GQL_MqttServer>().Id;

                return _manager.State(id);
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

                var response = await _mediator.Send(command);

                IMapper _mapper = ctx.Service<IMapper>();

                return _mapper.Map<GQL_MqttServer>(response);
            }
        }
    }
}