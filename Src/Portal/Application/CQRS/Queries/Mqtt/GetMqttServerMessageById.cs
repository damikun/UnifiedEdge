using MediatR;
using AutoMapper;
using Server.Mqtt.DTO;
using Aplication.Core;
using FluentValidation;
using Server.Manager.Mqtt;
using Aplication.Core.Pagination;
using Aplication.CQRS.Behaviours;
using Aplication.Services.ServerFascade;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server message by Uid
    /// </summary>
    public class GetMqttServerMessageById
        : CommandBase<DTO_MqttMessage?>
    {

#nullable disable
        public string Server_uid { get; set; }

        public string Message_uid { get; set; }
#nullable enable

        public GetMqttServerMessageById(
            string server_uid,
            string message_uid
        )
        {
            Server_uid = server_uid;
            Message_uid = message_uid;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerMessageById Field Validator
    /// </summary>
    public class GetMqttServerMessageByIdValidator
        : AbstractValidator<GetMqttServerMessageById>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerMessageByIdValidator(IServerFascade fascade)
        {
            _fascade = fascade;

            RuleFor(e => e.Server_uid)
            .NotNull()
            .NotEmpty()
            .MustAsync(Exist).WithMessage("Server not found");

            RuleFor(e => e.Message_uid)
            .NotNull()
            .NotEmpty();
        }

        public async Task<bool> Exist(
            string server_uid,
            CancellationToken cancellationToken)
        {
            return await _fascade.Contains(server_uid);
        }
    }

    /// <summary>
    /// GetMqttServerMessageById Field Authorization validator
    /// </summary>
    public class GetMqttServerMessageByIdAuthorizationValidator
        : AuthorizationValidator<GetMqttServerMessageById>
    {
        public GetMqttServerMessageByIdAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerMessageById</c> command </summary>
    public class GetMqttServerMessageByIdHandler
        : IRequestHandler<GetMqttServerMessageById, DTO_MqttMessage?>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerMessageByIdHandler(
            IServerFascade fascade,
            IMapper mapper)
        {
            _mapper = mapper;

            _fascade = fascade;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerMessageById</c>
        /// </summary>
        public async Task<DTO_MqttMessage?> Handle(
            GetMqttServerMessageById request, CancellationToken cancellationToken
        )
        {
            IMqttServerManager manager = (IMqttServerManager)await _fascade.GetManager(request.Server_uid);

            var message = await manager.GetMessageByUid(request.Server_uid, request.Message_uid);

            return message;
        }
    }
}