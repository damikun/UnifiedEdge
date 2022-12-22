using MediatR;
using MQTTnet;
using AutoMapper;
using Aplication.DTO;
using MQTTnet.Server;
using Aplication.Core;
using Server.Mqtt.DTO;
using FluentValidation;
using MediatR.Pipeline;
using MQTTnet.Protocol;
using Persistence.Portal;
using Server.Manager.Mqtt;
using Aplication.Services;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// PublishMqttMessage
    /// </summary>
    [Authorize(Policy = "write_access")]
    [Authorize(Policy = "authenticated_user")]
    public class PublishMqttMessage
    : CommandBase<DTO_MqttMessage>
    {

#nullable disable
        public string ServerUid { get; set; }
#nullable enable

        public MessageContentType ContentType { get; set; }

        public MessageQoS QoS { get; set; }

        public bool Retain { get; set; }

        public int? ExpireInterval { get; set; }

#nullable disable
        public byte[] Payload { get; set; }

        public string Topic { get; set; }
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - PublishMqttMessage
    /// </summary>
    public class PublishMqttMessageValidator
        : AbstractValidator<PublishMqttMessage>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IMqttServerManager _manager;

        public PublishMqttMessageValidator(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMqttServerManager manager
        )
        {
            _factory = factory;

            _manager = manager;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.Topic)
            .NotNull()
            .NotEmpty();

            RuleFor(e => e.Topic)
            .NotNull()
            .NotEmpty();

            RuleFor(e => e.ExpireInterval)
            .GreaterThanOrEqualTo(0);

            RuleFor(e => e.ServerUid)
            .NotNull()
            .NotEmpty()
            .MustAsync(ExistInRuntime)
            .WithMessage("Server not found");
        }

        public async Task<bool> ExistInRuntime(
            string ServerUid,
            CancellationToken cancellationToken)
        {
            return await _manager.Contains(ServerUid);
        }

    }

    /// <summary>
    /// Authorization validators - PublishMqttMessage
    /// </summary>
    public class PublishMqttMessageAuthorizationValidator
        : AuthorizationValidator<PublishMqttMessage>
    {
        public PublishMqttMessageAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>PublishMqttMessageHandler</c> command </summary>
    public class PublishMqttMessageHandler
        : IRequestHandler<PublishMqttMessage, DTO_MqttMessage>
    {

        /// <summary>
        /// Injected <c>IMediator</c>
        /// </summary>
        private readonly IMediator _mediator;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>IMqttServerManager</c>
        /// </summary>
        private readonly IMqttServerManager _manager;

        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current;

        /// <summary>
        /// Main constructor
        /// </summary>
        public PublishMqttMessageHandler(
            IMqttServerManager manager,
            IMapper mapper,
            IMediator mediator,
            ICurrentUser current
        )
        {
            _current = current;

            _manager = manager;

            _mapper = mapper;

            _mediator = mediator;
        }

        /// <summary>
        /// Command handler for <c>PublishMqttMessage</c>
        /// </summary>
        public async Task<DTO_MqttMessage> Handle(
            PublishMqttMessage request,
            CancellationToken cancellationToken
        )
        {
            var message = new MqttApplicationMessage()
            {
                ContentType = GetContentType(request.ContentType),
                MessageExpiryInterval = request.ExpireInterval != null ? (uint)request.ExpireInterval : 0,
                Payload = request.Payload,
                QualityOfServiceLevel = (MqttQualityOfServiceLevel)request.QoS,
                Retain = request.Retain,
                Topic = request.Topic,
            };

            var injected_message = new InjectedMqttApplicationMessage(message)
            {
                SenderClientId = !string.IsNullOrWhiteSpace(_current.Name) ? $"Sys-{_current.Name}" : "Sys",
            };

            var TimeStamp = DateTime.Now;

            await _manager.Publish(request.ServerUid, injected_message, cancellationToken);

            var message_dto = new DTO_MqttMessage()
            {
                ClientId = injected_message.SenderClientId,
                ContentType = injected_message.ApplicationMessage.ContentType,
                Dup = injected_message.ApplicationMessage.Dup,
                Qos = (byte)injected_message.ApplicationMessage.QualityOfServiceLevel,
                ResponseTopic = injected_message.ApplicationMessage.ResponseTopic,
                Retain = injected_message.ApplicationMessage.Retain,
                TimeStamp = TimeStamp,
                ServerUid = request.ServerUid,
                Topic = injected_message.ApplicationMessage.Topic,
                TopicUid = MqttStoredTopic.GetUid(request.ServerUid, injected_message.ApplicationMessage.Topic),
                ExpireInterval = injected_message.ApplicationMessage.MessageExpiryInterval,
                Uid = Guid.NewGuid().ToString(),
                Payload = injected_message.ApplicationMessage.Payload,
                ClientUid = DTO_StoredMqttClient.GetUid(request.ServerUid, injected_message.SenderClientId)
            };

            return message_dto;
        }

        private string? GetContentType(MessageContentType content_type)
        {
            switch (content_type)
            {
                case MessageContentType.json: return "application/json";
                case MessageContentType.text: return "text/html";

                default: return null;
            }
        }
    }

    //---------------------------------------
    //---------------------------------------


    public class PublishMqttMessage_PostProcessor
        : IRequestPostProcessor<PublishMqttMessage, DTO_MqttMessage>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;


        public PublishMqttMessage_PostProcessor(
            IMemoryCache cache,
            IServerFascade fascade,
            Aplication.Services.IPublisher publisher
        )
        {
            _fascade = fascade;

            _publisher = publisher;
        }

        public async Task Process(
            PublishMqttMessage request,
            DTO_MqttMessage response,
            CancellationToken cancellationToken
        )
        {
            // Publish?
        }
    }

}