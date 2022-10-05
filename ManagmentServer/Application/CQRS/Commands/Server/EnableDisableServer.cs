using MediatR;
using AutoMapper;
using Persistence;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Aplication.Events.Server;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// EnableDisableServer
    /// </summary>
    // [Authorize]
    public class EnableDisableServer : CommandBase<Domain.Server.ServerBase>
    {
#nullable disable
        public string UID;
#nullable enable

        public bool Enable { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - EnableDisableServer
    /// </summary>
    public class EnableDisableServerValidator : AbstractValidator<EnableDisableServer>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public EnableDisableServerValidator(IDbContextFactory<ManagmentDbCtx> factory)
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
                .AnyAsync(e => e.UID == Uid);
        }
    }

    /// <summary>
    /// Authorization validators - EnableDisableServer
    /// </summary>
    public class EnableDisableServerAuthorizationValidator : AuthorizationValidator<EnableDisableServer>
    {
        public EnableDisableServerAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>EnableDisableServerHandler</c> command </summary>
    public class EnableDisableServerHandler : IRequestHandler<EnableDisableServer, Domain.Server.ServerBase>
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
        public EnableDisableServerHandler(
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
        /// Command handler for <c>EnableDisableServer</c>
        /// </summary>
        public async Task<Domain.Server.ServerBase> Handle(
            EnableDisableServer request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server = await dbContext.Servers
            .Where(e => e.UID == request.UID)
            .FirstAsync(cancellationToken);

            server.IsEnabled = request.Enable;

            await dbContext.SaveChangesAsync(cancellationToken);

            return server;
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class EnableDisableServer_PostProcessor
        : IRequestPostProcessor<EnableDisableServer, Domain.Server.ServerBase>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public EnableDisableServer_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            EnableDisableServer request,
            Domain.Server.ServerBase updated_server,
            CancellationToken cancellationToken)
        {
            await _publisher.Publish<ServerEnabledDisabledNotifi>(
                new ServerEnabledDisabledNotifi(
                    updated_server.UID,
                    updated_server.IsEnabled
                ),
                Services.PublishStrategy.ParallelNoWait
            );
        }
    }

}