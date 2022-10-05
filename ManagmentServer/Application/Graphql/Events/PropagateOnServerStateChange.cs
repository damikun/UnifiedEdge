using Server;
using MediatR;
using AutoMapper;
using Persistence;
using Aplication.DTO;
using HotChocolate.Subscriptions;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;


namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>PropagateOnServerStateChange_Handler</c>
    /// </summary>
    public class PropagateOnServerStateChange_Handler
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


        public PropagateOnServerStateChange_Handler(
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
                $"ServerStateChanged.{notification.ServerEvent.UID}",
                _mapper.Map<GQL_ServerStateChangedNotification>(
                    notification.ServerEvent
                )
            );

        }
    }
}