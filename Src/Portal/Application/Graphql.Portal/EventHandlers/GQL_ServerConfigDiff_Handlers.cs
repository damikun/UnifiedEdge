using Server;
using MediatR;
using AutoMapper;
using Persistence.Portal;
using Domain.Server;
using Aplication.DTO;
using HotChocolate.Subscriptions;
using Microsoft.EntityFrameworkCore;
using Aplication.Graphql.Interfaces;

namespace Aplication.Events.Server
{

    public class GQL_ServerConfigDiff_PropagateSub_Handler
        : INotificationHandler<ServerGenericEventNotification<ServerConfigMatch>>
    {

        /// <summary>
        /// Injected <c>ITopicEventSender</c>
        /// </summary>
        private readonly ITopicEventSender _sender;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>IMediator</c>
        /// </summary>
        private readonly IMediator _mediator;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GQL_ServerConfigDiff_PropagateSub_Handler(
            ITopicEventSender sender,
            IMapper mapper,
            IMediator mediator,
            IDbContextFactory<ManagmentDbCtx> factory)
        {
            _sender = sender;

            _factory = factory;

            _mapper = mapper;

            _mediator = mediator;
        }

        public async Task Handle(
            ServerGenericEventNotification<ServerConfigMatch> notification,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
            _factory.CreateDbContext();

            var e = notification.ServerEvent;

            var server = await dbContext.Servers
                .AsNoTracking()
                .Where(e => e.UID == notification.ServerGuid)
                .FirstOrDefaultAsync(cancellationToken);

            if (server == null)
            {
                return;
            }

            var dto_server = _mapper.Map<ServerBase, Aplication.Interfaces.IServer>(server);

            var gql_server = _mapper.Map<GQL_IServer>(dto_server);

            var sub_event = new GQL_ConfigMatch()
            {
                IsMatch = e.isMatch,
                Server = gql_server,
                Timestamp = e.TimeStamp
            };

            await _sender.SendAsync(
                $"Server.{e.UID}.ConfigState",
                sub_event
            );
        }
    }
}