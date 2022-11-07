using MediatR;
using AutoMapper;
using Persistence.Portal;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using MediatR.Pipeline;
using FluentValidation;
using Microsoft.EntityFrameworkCore;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// Command for updateing WebHook name
    /// </summary>
    public class UpdateWebHookName : CommandBase<DTO_WebHook>
    {

        /// <summary>WebHook Id </summary>
        public long WebHookId { get; set; }

        /// <summary> Name </summary>
        public string Name { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// UpdateWebHookName Validator
    /// </summary>
    public class UpdateWebHookNameValidator : AbstractValidator<UpdateWebHookName>
    {

        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public UpdateWebHookNameValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.Name)
            .NotNull()
            .NotEmpty()
            .MinimumLength(3);

            RuleFor(e => e.WebHookId)
            .GreaterThan(0);

            RuleFor(e => e.WebHookId)
            .MustAsync(HookExist)
            .WithMessage("Hook was not found");
        }

        public async Task<bool> HookExist(
            UpdateWebHookName request,
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


    /// <summary>Handler for <c>UpdateWebHookName</c> command </summary>
    public class UpdateWebHookNameHandler : IRequestHandler<UpdateWebHookName, DTO_WebHook>
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
        public UpdateWebHookNameHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;
        }

        /// <summary>
        /// Command handler for <c>UpdateWebHookName</c>
        /// </summary>
        public async Task<DTO_WebHook> Handle(UpdateWebHookName request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            WebHook wh = await dbContext.WebHooks
            .TagWith(string.Format("UpdateWebHookName Command - Query Hook"))
            .Where(e => e.Id == request.WebHookId)
            .FirstAsync(cancellationToken);

            wh.Name = request.Name;

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_WebHook>(wh); ;
        }
    }

    //---------------------------------------
    //---------------------------------------

    public class UpdateWebHookNamePostProcessor
        : IRequestPostProcessor<UpdateWebHookName, DTO_WebHook>
    {
        public UpdateWebHookNamePostProcessor()
        {

        }

        public async Task Process(
            UpdateWebHookName request,
            DTO_WebHook response,
            CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
        }
    }
}