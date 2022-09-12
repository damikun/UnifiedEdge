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
    /// Graphql MqttServer Type converter
    /// </summary>
    public class MqttServerType : ObjectType<GQL_MqttServer>
    {
        private readonly IMqttManager _mqtt_manager;

        private readonly IMapper _mapper;

        public MqttServerType(
            IMqttManager mqtt_manager,
            IMapper mapper
        )
        {
            _mapper = mapper;
            _mqtt_manager = mqtt_manager;
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

                return _mqtt_manager.State(id);
            });

            descriptor.Field(e => e.Uptime)
            .Type<UptimeType>()
            .Resolve(async (ctx, ct) =>
            {
                var id = ctx.Parent<GQL_MqttServer>().Id;

                return new GQL_Uptime()
                {
                    Uptime = await _mqtt_manager.ServerUptime(id)
                };
            });
        }

        private class MqttServerTypeResolvers
        {
            public async Task<GQL_MqttServer> GetMqttServerNode(
               string Id, // gql Id == Guid on DB side
               IResolverContext ctx,
               CancellationToken cancellationToken)
            {

                IMediator _mediator = ctx.Service<IMediator>();

                var command = new GetMqttServerByGuid()
                {
                    Guid = Id
                };

                var response = await _mediator.Send(command);

                IMapper _mapper = ctx.Service<IMapper>();

                return _mapper.Map<GQL_MqttServer>(response);
            }
        }
    }
}