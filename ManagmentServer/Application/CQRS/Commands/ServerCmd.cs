using Server;
using MediatR;
using AutoMapper;
using Persistence;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// ServerCmd
    /// </summary>
    // [Authorize]
    public class ProcessServerCmd : CommandBase<Unit>
    {
#nullable disable
        public string UID;
#nullable enable

        public ServerCmd Command { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - ServerCmd
    /// </summary>
    public class ServerCmdValidator : AbstractValidator<ProcessServerCmd>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public ServerCmdValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.UID)
            .NotEmpty()
            .NotNull()
            .MinimumLength(3)
            .MustAsync(Exist).WithMessage("Server not found");
        }

        public async Task<bool> Exist(
            string Uid,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
                .AnyAsync(e => e.UID != Uid);
        }
    }

    /// <summary>
    /// Authorization validators - ServerCmd
    /// </summary>
    public class ServerCmdAuthorizationValidator : AuthorizationValidator<ProcessServerCmd>
    {
        public ServerCmdAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>ServerCmdHandler</c> command </summary>
    public class ServerCmdHandler : IRequestHandler<ProcessServerCmd, Unit>
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
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;


        /// <summary>
        /// Main constructor
        /// </summary>
        public ServerCmdHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            IServerFascade fascade,
            IMediator mediator)
        {
            _factory = factory;

            _mapper = mapper;

            _mediator = mediator;

            _fascade = fascade;
        }

        /// <summary>
        /// Command handler for <c>ProcessServerCmd</c>
        /// </summary>
        public async Task<Unit> Handle(ProcessServerCmd request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            await _fascade.ProcesCommand(request.UID, request.Command);

            return Unit.Value;
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class ServerCmd_PostProcessor
        : IRequestPostProcessor<ProcessServerCmd, Unit>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public ServerCmd_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            ProcessServerCmd request,
            Unit response,
            CancellationToken cancellationToken)
        {
            // To be implemented

            await Task.CompletedTask;
        }
    }

}