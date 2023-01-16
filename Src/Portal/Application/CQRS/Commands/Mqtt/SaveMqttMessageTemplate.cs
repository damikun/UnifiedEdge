using MediatR;
using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Aplication.Services;
using System.Globalization;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// Create mqtt message template
    /// </summary>
    [Authorize]
    public class SaveMqttMessageTemplate
        : CommandBase<DTO_MqttMessageTemplate>
    {

#nullable disable

        public string Name { get; set; }

        public string ServerUid { get; set; }

        public MessageContentType ContentType { get; set; }

        public MessageQoS QoS { get; set; }

        public bool Retain { get; set; }

        public int? ExpireInterval { get; set; }

        public string Payload { get; set; }

        public string Topic { get; set; }

#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// SaveMqttMessageTemplate Field Validator
    /// </summary>
    public class SaveMqttMessageTemplateValidator
        : AbstractValidator<SaveMqttMessageTemplate>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current;

        public SaveMqttMessageTemplateValidator(
            IDbContextFactory<ManagmentDbCtx> factory,
            ICurrentUser current
        )
        {
            _factory = factory;

            _current = current;

            RuleFor(e => e.Name)
                .NotNull()
                .NotEmpty()
                .MinimumLength(2);

            RuleFor(e => e.ServerUid)
                .NotNull()
                .NotEmpty()
                .MustAsync(ServerExist)
                .WithMessage("MqttServer not found");

            RuleFor(e => e.Topic)
                .NotNull()
                .NotEmpty();

            RuleFor(e => e.Topic)
                .Must(IsLegalUnicode)
                .WithMessage("topic invalid Unicode string");
        }

        static bool IsLegalUnicode(string str)
        {
            for (int i = 0; i < str.Length; i++)
            {
                var uc = char.GetUnicodeCategory(str, i);

                if (uc == UnicodeCategory.Surrogate)
                {
                    // Unpaired surrogate, like  "😵"[0] + "A" or  "😵"[1] + "A"
                    return false;
                }
                else if (uc == UnicodeCategory.OtherNotAssigned)
                {
                    // \uF000 or \U00030000
                    return false;
                }

                if (char.IsHighSurrogate(str, i))
                {
                    i++;
                }
            }

            return true;
        }

        public async Task<bool> ServerExist(
            string ServerUid,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
            .AnyAsync(e => e.UID == ServerUid);
        }
    }

    /// <summary>
    /// SaveMqttMessageTemplate Field Authorization validator
    /// </summary>
    public class SaveMqttMessageTemplateAuthorizationValidator
        : AuthorizationValidator<SaveMqttMessageTemplate>
    {
        private readonly ICurrentUser _current_user;

        public SaveMqttMessageTemplateAuthorizationValidator(
            ICurrentUser current_user
        )
        {
            _current_user = current_user;

            RuleFor(e => e)
            .Must(ExistValidUserSubId)
            .WithMessage("Missing user profile data");

        }

        public bool ExistValidUserSubId(SaveMqttMessageTemplate command)
        {
            if (string.IsNullOrWhiteSpace(_current_user.UserId))
            {
                return false;
            }

            return true;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SaveMqttMessageTemplate</c> command </summary>
    public class SaveMqttMessageTemplateHandler
        : IRequestHandler<SaveMqttMessageTemplate, DTO_MqttMessageTemplate>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx></c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current_user;

        /// <summary>
        /// Main constructor
        /// </summary>
        public SaveMqttMessageTemplateHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICurrentUser current_user
        )
        {
            _mapper = mapper;

            _factory = factory;

            _current_user = current_user;
        }

        /// <summary>
        /// Command handler for <c>SaveMqttMessageTemplate</c>
        /// </summary>
        public async Task<DTO_MqttMessageTemplate> Handle(
            SaveMqttMessageTemplate request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var sub_id = _current_user.UserId;

            var message_temp = new MqttMessageTemplate()
            {
                Name = request.Name,
                ContentType = request.ContentType,
                Payload = request.Payload,
                ExpireInterval = request.ExpireInterval,
                QoS = request.QoS,
                Retain = request.Retain,
                Topic = NormalizeTopic(request.Topic),
                ServerUid = request.ServerUid,
                UserUid = sub_id
            };

            var cfg = dbContext.MqttMessageTemplates.Add(message_temp);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttMessageTemplate>(message_temp);
        }

        public static string NormalizeTopic(string topic)
        {
            var normalised = topic.ToLowerInvariant()
                .TrimStart()
                .TrimEnd()
                .TrimStart('/');

            //Remove white-spaces in-between
            return Regex.Replace(normalised, @"\s+", "");
        }
    }

}