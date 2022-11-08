using MediatR;
using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Portal;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;


namespace Aplication.CQRS.Commands
{
    /// <summary>
    /// Command for creating webhook
    /// </summary>
    [Authorize]
    public class CreateWebHook : CommandBase<DTO_WebHook>
    {

        public CreateWebHook()
        {
            this.HookGroups = new HashSet<HookEventGroup>();
        }

        /// <summary> Name </summary>
        public string Name { get; set; }

        /// <summary> Url </summary>
        public string WebHookUrl { get; set; }

        /// <summary> Secret </summary>
#nullable enable
        public string? Secret { get; set; }

        /// <summary> ServerUid </summary>
        public string? ServerUid { get; set; }
#nullable disable

        /// <summary> IsActive </summary>
        public bool IsActive { get; set; }

        /// <summary> HookGroups </summary>
        public HashSet<HookEventGroup> HookGroups { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// CreateWebHook Validator
    /// </summary>
    public class CreateWebHookValidator : AbstractValidator<CreateWebHook>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public const int MAX_HOOK_COUNT = 100;

        public CreateWebHookValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.WebHookUrl)
            .NotEmpty()
            .NotNull();

            RuleFor(e => e.Name)
            .NotEmpty()
            .NotNull()
            .MinimumLength(3);

            RuleFor(e => e.WebHookUrl)
            .Matches(Common.URI_REGEX)
            .WithMessage("Does not match URI expression");

            RuleFor(e => e.WebHookUrl)
            .MustAsync(BeUniqueByURL)
            .WithMessage("Hook endpoint allready exist");

            RuleFor(e => e.WebHookUrl)
            .MustAsync(CheckMaxAllowedHooksCount)
            .WithMessage("Max allowed hooks count detected");

            RuleFor(e => e.HookGroups)
            .NotNull();
        }

        public async Task<bool> BeUniqueByURL(
            string url,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.WebHooks.AllAsync(e => e.WebHookUrl != url);
        }

        public async Task<bool> CheckMaxAllowedHooksCount(
            string url,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return (await dbContext.WebHooks.CountAsync()) <= MAX_HOOK_COUNT;
        }
    }

    /// <summary>
    /// Authorization validators for CreateWebHook
    /// </summary>
    public class CreateWebHookAuthorizationValidator
        : AuthorizationValidator<CreateWebHook>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public CreateWebHookAuthorizationValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {

            _factory = factory;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>CreateWebHook</c> command </summary>
    public class CreateWebHookHandler
        : IRequestHandler<CreateWebHook, DTO_WebHook>
    {

        /// <summary>
        /// Injected IDbContextFactory of ManagmentDbCtx
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public CreateWebHookHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;
        }

        /// <summary>
        /// Command handler for <c>CreateWebHook</c>
        /// </summary>
        public async Task<DTO_WebHook> Handle(
            CreateWebHook request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            WebHook hook = new WebHook
            {
                WebHookUrl = request.WebHookUrl,
                Secret = request.Secret,
                ContentType = "application/json",
                IsActive = request.IsActive,
                EventGroup = request.HookGroups ?? new HashSet<HookEventGroup>(),
                ServerUid = request.ServerUid,
                Uid = UidHelper.GetNormalisedUid(),
                Name = request.Name
            };

            dbContext.WebHooks.Add(hook);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_WebHook>(hook);
        }
    }

    //---------------------------------------
    //---------------------------------------

    public class CreateWebHookPostProcessor
        : IRequestPostProcessor<CreateWebHook, DTO_WebHook>
    {

        public CreateWebHookPostProcessor()
        {

        }

        public async Task Process(
            CreateWebHook request,
            DTO_WebHook response,
            CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
        }
    }
}