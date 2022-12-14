using MediatR;
using AutoMapper;
using Server.Mqtt;
using Server.Mqtt.DTO;
using Persistence.Portal;
using HotChocolate.Subscriptions;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;


namespace Aplication.Services.ServerEventHandler
{
    public sealed class MessageEventWorker : BackgroundService
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private readonly IMediator _mediator;

        private readonly IMapper _mapper;

        private readonly IServerEventQueue _queueProvider;

        private readonly ITopicEventSender _sender;

        private readonly IPublisher _publisher;
        public MessageEventWorker(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerEventQueue queueProvider,
            IMediator mediator,
            IMapper mapper,
            ITopicEventSender sender)
        {
            _factory = factory;

            _mediator = mediator;

            _sender = sender;

            _mapper = mapper;

            _queueProvider = queueProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            while (!stoppingToken.IsCancellationRequested)
            {
                await _queueProvider.MessageQueue.Reader.WaitToReadAsync(stoppingToken);

                try
                {
                    var message_event = await _queueProvider.MessageQueue.Reader.ReadAsync();

                    if (message_event is MqttNewMessage new_message)
                    {
                        if (!string.IsNullOrWhiteSpace(new_message.ServerUid) &&
                            new_message.Message is not null &&
                            !string.IsNullOrWhiteSpace(new_message.Message.ClientUid) &&
                            !string.IsNullOrWhiteSpace(new_message.Message.TopicUid)
                        )
                        {
                            var gql_dto = _mapper.Map<GQL_MqttMessage>(new_message.Message);

                            await _sender.SendAsync<GQL_MqttMessage>(
                                $"EdgeMqttServer.{new_message.ServerUid}.NewMessage",
                                gql_dto
                            );
                        }
                    }
                }
                catch (Exception ex)
                {
                    // System.Console.WriteLine(ex.ToString());
                }
            }

            await Task.CompletedTask;
        }
    }
}