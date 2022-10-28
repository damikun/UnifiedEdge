using MediatR;
using AutoMapper;
using Persistence;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using MediatR.Pipeline;
using FluentValidation;
using Microsoft.EntityFrameworkCore;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// Command for updateing WebHook secret
    /// </summary>
    public class UpdateWebHookSecret : CommandBase<DTO_WebHook>
    {

        /// <summary>WebHook Id </summary>
        public long WebHookId { get; set; }

        /// <summary> Secret </summary>
        public string Secret { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// UpdateWebHookSecret Validator
    /// </summary>
    public class UpdateWebHookSecretValidator : AbstractValidator<UpdateWebHookSecret>
    {

        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public UpdateWebHookSecretValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.WebHookId)
            .NotNull()
            .GreaterThan(0);

            RuleFor(e => e.Secret)
            .MaximumLength(2000);

            RuleFor(e => e.WebHookId)
            .MustAsync(HookExist)
            .WithMessage("Hook was not found");
        }

        public async Task<bool> HookExist(
            UpdateWebHookSecret request,
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


    /// <summary>Handler for <c>UpdateWebHookSecret</c> command </summary>
    public class UpdateWebHookSecretHandler : IRequestHandler<UpdateWebHookSecret, DTO_WebHook>
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
        public UpdateWebHookSecretHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;
        }

        /// <summary>
        /// Command handler for <c>UpdateWebHookSecret</c>
        /// </summary>
        public async Task<DTO_WebHook> Handle(UpdateWebHookSecret request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            WebHook wh = await dbContext.WebHooks
            .TagWith(string.Format("UpdateWebHookSecret Command - Query Hook"))
            .Where(e => e.Id == request.WebHookId)
            .FirstAsync(cancellationToken);

            wh.Secret = request.Secret;

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_WebHook>(wh); ;
        }
    }

    //---------------------------------------
    //---------------------------------------

    public class UpdateWebHookSecretPostProcessor
        : IRequestPostProcessor<UpdateWebHookSecret, DTO_WebHook>
    {
        public UpdateWebHookSecretPostProcessor()
        {

        }

        public async Task Process(
            UpdateWebHookSecret request,
            DTO_WebHook response,
            CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
        }
    }
}