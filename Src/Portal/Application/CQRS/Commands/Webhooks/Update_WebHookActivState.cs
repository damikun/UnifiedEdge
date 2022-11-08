using MediatR;
using AutoMapper;
using Persistence.Portal;
using Aplication.DTO;
using Aplication.Core;
using MediatR.Pipeline;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Domain.Server;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// Command for updating webhook
    /// </summary>
    [Authorize]
    public class UpdateWebHookActivState : CommandBase<DTO_WebHook>
    {

        /// <summary>WebHook Id </summary>
        public long WebHookId { get; set; }

        /// <summary> IsActive </summary>
        public bool IsActive { get; set; }
    }

    //---------------------------------------
    //---------------------------------------


    /// <summary>
    /// UpdateWebHookActivState Validator
    /// </summary>
    public class UpdateWebHookActivStateValidator : AbstractValidator<UpdateWebHookActivState>
    {

        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public UpdateWebHookActivStateValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.WebHookId)
            .GreaterThan(0);

            RuleFor(e => e.WebHookId)
            .MustAsync(HookExist)
            .WithMessage("Hook was not found");
        }

        public async Task<bool> HookExist(
            UpdateWebHookActivState request,
            long id,
            CancellationToken cancellationToken)
        {

            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.WebHooks.AnyAsync(e => e.Id == request.WebHookId);
        }
    }

    //---------------------------------------
    //---------------------------------------


    /// <summary>Handler for <c>UpdateWebHookActivState</c> command </summary>
    public class UpdateWebHookActivStateHandler
        : IRequestHandler<UpdateWebHookActivState, DTO_WebHook>
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
        public UpdateWebHookActivStateHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;
        }

        /// <summary>
        /// Command handler for <c>UpdateWebHookActivState</c>
        /// </summary>
        public async Task<DTO_WebHook> Handle(
            UpdateWebHookActivState request,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            WebHook wh = await dbContext.WebHooks
            .TagWith("UpdateWebHookActivState Command - Query Hook")
            .Where(e => e.Id == request.WebHookId)
            .FirstAsync(cancellationToken);

            wh.IsActive = request.IsActive;

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_WebHook>(wh); ;
        }
    }

    //---------------------------------------
    //---------------------------------------

    public class UpdateWebHookActivStatePostProcessor
        : IRequestPostProcessor<UpdateWebHookActivState, DTO_WebHook>
    {

        public UpdateWebHookActivStatePostProcessor()
        {

        }

        public async Task Process(
            UpdateWebHookActivState request,
            DTO_WebHook response,
            CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
        }
    }
}