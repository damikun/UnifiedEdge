using MediatR;
using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Aplication.Services;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// Query Mqtt Server Explorer User scoped Saved Subscriptions
    /// </summary>
    public class CreateMqttServerExplorerUserScopedSubs
        : CommandBase<DTO_MqttExplorerSub>
    {

#nullable disable
        public string ServerUid { get; set; }

        public string Topic { get; set; }

#nullable enable

        public string? Color { get; set; }

        public bool NoLocal { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// CreateMqttServerExplorerUserScopedSubs Field Validator
    /// </summary>
    public class CreateMqttServerExplorerUserScopedSubsValidator
        : AbstractValidator<CreateMqttServerExplorerUserScopedSubs>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private const string HEX_COLOR_REGEX = @"^#(?:[0-9a-fA-F]{3}){1,2}$";

        public CreateMqttServerExplorerUserScopedSubsValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.ServerUid)
                .NotNull()
                .NotEmpty()
                .MustAsync(ServerExist)
                .WithMessage("MqttServer not found");

            RuleFor(e => e.Topic)
                .NotNull()
                .NotEmpty();

            RuleFor(e => e.Color)
                .Must(IsValidHex)
                .WithMessage("Invalid color HEX value");
        }

        public bool IsValidHex(string? Color)
        {
            if (string.IsNullOrWhiteSpace(Color))
            {
                return true;
            }

            return Regex.Match(Color, HEX_COLOR_REGEX, RegexOptions.IgnoreCase).Success;
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
    /// CreateMqttServerExplorerUserScopedSubs Field Authorization validator
    /// </summary>
    public class CreateMqttServerExplorerUserScopedSubsAuthorizationValidator
        : AuthorizationValidator<CreateMqttServerExplorerUserScopedSubs>
    {
        private readonly ICurrentUser _current_user;

        public CreateMqttServerExplorerUserScopedSubsAuthorizationValidator(
            ICurrentUser current_user
        )
        {
            _current_user = current_user;

            RuleFor(e => e)
            .Must(ExistValidUserSubId)
            .WithMessage("Missing user profile data");

        }

        public bool ExistValidUserSubId(CreateMqttServerExplorerUserScopedSubs command)
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

    /// <summary>Handler for <c>CreateMqttServerExplorerUserScopedSubs</c> command </summary>
    public class CreateMqttServerExplorerUserScopedSubsHandler
        : IRequestHandler<CreateMqttServerExplorerUserScopedSubs, DTO_MqttExplorerSub>
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
        public CreateMqttServerExplorerUserScopedSubsHandler(
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
        /// Command handler for <c>CreateMqttServerExplorerUserScopedSubs</c>
        /// </summary>
        public async Task<DTO_MqttExplorerSub> Handle(
            CreateMqttServerExplorerUserScopedSubs request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var sub_id = _current_user.UserId;

            var sub_cfg = new MqttExplorerSub()
            {
                Color = request.Color,
                NoLocal = request.NoLocal,
                Topic = request.Topic,
                ServerUid = request.ServerUid,
                UserUid = sub_id
            };

            var cfg = dbContext.MqttExplorerSubs.Add(sub_cfg);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttExplorerSub>(sub_cfg);
        }
    }
}