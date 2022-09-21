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
    /// RemoveServer
    /// </summary>
    // [Authorize]
    public class RemoveServer : CommandBase<string>
    {
#nullable disable
        public string UID;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - RemoveServer
    /// </summary>
    public class RemoveServerValidator : AbstractValidator<RemoveServer>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public RemoveServerValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.UID)
            .NotEmpty()
            .NotNull()
            .MustAsync(MustExist);
        }

        public async Task<bool> MustExist(
            string uid,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.ServerCfg
            .AnyAsync(
                e => e.ServerUID == uid
            );
        }

    }

    /// <summary>
    /// Authorization validators - RemoveServer
    /// </summary>
    public class RemoveServerAuthorizationValidator : AuthorizationValidator<RemoveServer>
    {
        public RemoveServerAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>RemoveServerHandler</c> command </summary>
    public class RemoveServerHandler : IRequestHandler<RemoveServer, string>
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
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        /// <summary>
        /// Injected <c>IEndpointProvider</c>
        /// </summary>
        private readonly IEndpointProvider _endpoint_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public RemoveServerHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            IServerFascade fascade,
            IMediator mediator,
            IEndpointProvider endpoint_provider
        )
        {
            _factory = factory;

            _mapper = mapper;

            _mediator = mediator;

            _fascade = fascade;

            _endpoint_provider = endpoint_provider;
        }

        /// <summary>
        /// Command handler for <c>RemoveServer</c>
        /// </summary>
        public async Task<string> Handle(RemoveServer request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server = await dbContext.Servers
            .Where(e => e.UID == request.UID)
            .FirstAsync(cancellationToken);

            dbContext.Servers.Remove(server);

            await dbContext.SaveChangesAsync(cancellationToken);

            return request.UID;
        }
    }

    //---------------------------------------
    //---------------------------------------


    public class RemoveServer_PostProcessor
        : IRequestPostProcessor<RemoveServer, string>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public RemoveServer_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            RemoveServer request,
            string uid,
            CancellationToken cancellationToken
        )
        {
            await _publisher.Publish<ServerRemovedNotifi>(
                new ServerRemovedNotifi(uid),
                Services.PublishStrategy.ParallelNoWait
            );

        }
    }

}