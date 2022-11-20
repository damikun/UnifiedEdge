using Server;
using MediatR;
using AutoMapper;
using Persistence.Portal;
using Aplication.DTO;
using HotChocolate.Subscriptions;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;


namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>GQL_OnServerStateChange_PropagateSub_Handler</c>
    /// </summary>
    public class GQL_OnServerStateChange_PropagateSub_Handler
        : INotificationHandler<ServerGenericEventNotification<ServerStateChangedEvent>>
    {

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        /// <summary>
        /// Injected <c>ITopicEventSender</c>
        /// </summary>
        private readonly ITopicEventSender _sender;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;


        public GQL_OnServerStateChange_PropagateSub_Handler(
            ILogger logger,
            IDbContextFactory<ManagmentDbCtx> factory,
            ITopicEventSender sender,
            IMapper mapper)
        {
            _logger = logger;

            _factory = factory;

            _sender = sender;

            _mapper = mapper;
        }

        public async Task Handle(
            ServerGenericEventNotification<ServerStateChangedEvent> notification,
            CancellationToken cancellationToken
        )
        {

            await _sender.SendAsync(
                $"ServerStateChanged.{notification.ServerEvent.ServerUid}",
                _mapper.Map<GQL_ServerStateChangedNotification>(
                    notification.ServerEvent
                )
            );

        }
    }
}