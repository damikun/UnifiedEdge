using MediatR;
using AutoMapper;
using Server.Mqtt;
using Domain.Server;
using Persistence.Portal;
using Aplication.CQRS.Commands;
using Aplication.Webhooks.Events;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.Scheduler;

namespace Aplication.Events.Server
{

    /// <summary>
    /// Command handler for user <c>Hook_MqttServerClientDisconected_WebHook_Handler</c>
    /// </summary>
    public class Hook_MqttServerClientDisconected_WebHook_Handler
        : INotificationHandler<ServerGenericEventNotification<MqttServerClientDisconnected>>
    {

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>IScheduler</c>
        /// </summary>
        private readonly IScheduler _scheduler;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;


        public Hook_MqttServerClientDisconected_WebHook_Handler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IScheduler scheduler,
            IMapper mapper)
        {
            _factory = factory;

            _scheduler = scheduler;

            _mapper = mapper;
        }

        public async Task Handle(
            ServerGenericEventNotification<MqttServerClientDisconnected> notification,
            CancellationToken cancellationToken
        )
        {
            var client = notification?.ServerEvent?.Client ?? null;

            if (client is null)
            {
                return;
            }
            var Payload = new Hook_Mqtt_ClientDisconnectedPayload()
            {
                ClientId = client.Uid,
                ServerId = client.ServerUid
            };

            var HookEvent = new Hook_Mqtt_ClientDisconnected(Payload);

            _scheduler.Enqueue(
                new EnqueWebHookEvent()
                {
                    EventGroup = HookEventGroup.mqtt,
                    Event = HookEvent
                }
            );

            await Task.CompletedTask;
        }
    }
}