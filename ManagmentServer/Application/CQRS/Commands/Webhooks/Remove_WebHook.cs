using MediatR;
using AutoMapper;
using Persistence;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Microsoft.EntityFrameworkCore;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// Command for removing hook
    /// </summary>
    public class RemoveWebHook : CommandBase<DTO_WebHook>
    {

        /// <summary>WebHook Id </summary>
        public long WebHookId { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// RemoveWebHook Validator
    /// </summary>
    public class RemoveWebHookValidator : AbstractValidator<RemoveWebHook>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public RemoveWebHookValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.WebHookId)
            .NotNull()
            .GreaterThan(0);

            RuleFor(e => e.WebHookId)
            .MustAsync(HookExist)
            .WithMessage("Hook was not found");
        }

        public async Task<bool> HookExist(
            RemoveWebHook request,
            long id,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.WebHooks
                .AnyAsync(e => e.Id == request.WebHookId);
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>RemoveWebHook</c> command </summary>
    public class RemoveWebHookHandler : IRequestHandler<RemoveWebHook, DTO_WebHook>
    {

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public RemoveWebHookHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper
        )
        {
            _factory = factory;

            _mapper = mapper;
        }

        /// <summary>
        /// Command handler for <c>RemoveWebHook</c>
        /// </summary>
        public async Task<DTO_WebHook> Handle(
            RemoveWebHook request,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            WebHook wh = await dbContext.WebHooks
                .TagWith("RemoveWebHook Command - Query Hook")
                .Where(e => e.Id == request.WebHookId)
                .FirstAsync(cancellationToken);

            var dto = _mapper.Map<DTO_WebHook>(wh);

            dbContext.WebHooks.Remove(wh);

            await dbContext.SaveChangesAsync(cancellationToken);

            return dto;
        }
    }

    //---------------------------------------
    //---------------------------------------

    public class RemoveWebHookPostProcessor
        : IRequestPostProcessor<RemoveWebHook, DTO_WebHook>
    {
        public RemoveWebHookPostProcessor()
        {

        }

        public async Task Process(
            RemoveWebHook request,
            DTO_WebHook response,
            CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
        }
    }
}