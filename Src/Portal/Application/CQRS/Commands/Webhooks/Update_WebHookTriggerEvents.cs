using MediatR;
using AutoMapper;
using Persistence.Portal;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Microsoft.EntityFrameworkCore;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// Command for updating webhook Uri
    /// </summary>
    public class UpdateWebHookTriggerGroups : CommandBase<DTO_WebHook>
    {
        public UpdateWebHookTriggerGroups()
        {
            this.HookGroups = new HashSet<HookEventGroup>();
        }

        /// <summary>WebHook Id </summary>
        public long WebHookId { get; set; }

        /// <summary>HookGroup</summary>y>
        public HashSet<HookEventGroup> HookGroups { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// UpdateWebHookTriggerGroups Validator
    /// </summary>
    public class UpdateWebHookTriggerEventsValidator : AbstractValidator<UpdateWebHookTriggerGroups>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public UpdateWebHookTriggerEventsValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.WebHookId)
            .GreaterThan(0);

            RuleFor(e => e.HookGroups)
            .NotNull();

            RuleFor(e => e.WebHookId)
            .MustAsync(HookExist)
            .WithMessage("Hook was not found");
        }

        public async Task<bool> HookExist(
            UpdateWebHookTriggerGroups request,
            long id,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.WebHooks.AnyAsync(e => e.Id == request.WebHookId);
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>UpdateWebHookTriggerGroups</c> command </summary>
    public class UpdateWebHookTriggerEventsHandler : IRequestHandler<UpdateWebHookTriggerGroups, DTO_WebHook>
    {

        /// <summary>
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public UpdateWebHookTriggerEventsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;
        }

        /// <summary>
        /// Command handler for <c>UpdateWebHookTriggerGroups</c>
        /// </summary>
        public async Task<DTO_WebHook> Handle(
            UpdateWebHookTriggerGroups request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            WebHook wh = await dbContext.WebHooks
            .TagWith(string.Format("UpdateWebHookTriggerGroups Command - Query Hook"))
            .Where(e => e.Id == request.WebHookId)
            .FirstAsync(cancellationToken);

            wh.EventGroup = request.HookGroups;

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_WebHook>(wh); ;
        }
    }

    //---------------------------------------
    //---------------------------------------

    public class UpdateWebHookTriggerEventsPostProcessor
        : IRequestPostProcessor<UpdateWebHookTriggerGroups, DTO_WebHook>
    {
        public UpdateWebHookTriggerEventsPostProcessor()
        {

        }

        public async Task Process(
            UpdateWebHookTriggerGroups request,
            DTO_WebHook response,
            CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
        }
    }
}