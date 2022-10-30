using MediatR;
using AutoMapper;
using Persistence;
using Server.Mqtt;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.Scheduler;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>Hook_MqttServerClientConnected_WebHook_Handler</c>
    /// </summary>
    public class Hook_MqttServerClientConnected_WebHook_Handler
        : INotificationHandler<ServerGenericEventNotification<MqttServerClientConnected>>
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
        /// Injected <c>IScheduler</c>
        /// </summary>
        private readonly IScheduler _scheduler;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;


        public Hook_MqttServerClientConnected_WebHook_Handler(
            ILogger logger,
            IDbContextFactory<ManagmentDbCtx> factory,
            IScheduler scheduler,
            IMapper mapper)
        {
            _logger = logger;

            _factory = factory;

            _scheduler = scheduler;

            _mapper = mapper;
        }

        public async Task Handle(
            ServerGenericEventNotification<MqttServerClientConnected> notification,
            CancellationToken cancellationToken
        )
        {
            await Task.CompletedTask;
        }
    }
}