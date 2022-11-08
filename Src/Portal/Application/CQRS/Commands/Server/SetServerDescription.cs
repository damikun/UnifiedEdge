using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Portal;
using Aplication.Events.Server;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// SetServerDescription
    /// </summary>
    [Authorize]
    public class SetServerDescription
        : CommandBase<(DTO_Server server, string old_description)>
    {
#nullable disable
        public string UID;

        public string Description;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - SetServerDescription
    /// </summary>
    public class SetServerDescriptionValidator
        : AbstractValidator<SetServerDescription>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public SetServerDescriptionValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.UID)
            .NotEmpty()
            .NotNull()
            .MustAsync(Exist)
            .WithMessage("Server not found");

            RuleFor(e => e.Description)
            .NotNull()
            .MaximumLength(100);
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
    /// Authorization validators - SetServerDescription
    /// </summary>
    public class SetServerDescriptionAuthorizationValidator
        : AuthorizationValidator<SetServerDescription>
    {
        public SetServerDescriptionAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SetServerDescriptionHandler</c> command </summary>
    public class SetServerDescriptionHandler
        : IRequestHandler<
            SetServerDescription,
            (DTO_Server server, string old_description)
        >
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
        /// Injected <c>IEndpointProvider</c>
        /// </summary>
        private readonly IEndpointProvider _endpoint_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public SetServerDescriptionHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            IMediator mediator,
            IEndpointProvider endpoint_provider
        )
        {
            _factory = factory;

            _mapper = mapper;

            _mediator = mediator;

            _endpoint_provider = endpoint_provider;
        }

        /// <summary>
        /// Command handler for <c>SetServerDescription</c>
        /// </summary>
        public async Task<(DTO_Server server, string old_description)> Handle(
            SetServerDescription request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server = await dbContext.Servers
                .Where(e => e.UID == request.UID)
                .FirstAsync(cancellationToken);

            string old_description = server.Description!;

            server.Description = request.Description;

            dbContext.Servers.Update(server);

            await dbContext.SaveChangesAsync(cancellationToken);

            var mapped_server_dto = _mapper.Map<DTO_Server>(server);

            return (mapped_server_dto, old_description);
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class SetServerDescription_PostProcessor
        : IRequestPostProcessor<
            SetServerDescription,
            (DTO_Server server, string old_description)
        >
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public SetServerDescription_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            SetServerDescription request,
            (DTO_Server server, string old_description) response,
            CancellationToken cancellationToken
        )
        {
            await _publisher.Publish<ServerDescriptionUpdatedNotifi>(
                new ServerDescriptionUpdatedNotifi(
                    response.server.Guid,
                    response.old_description,
                    response.server.Description!
                ),
                Services.PublishStrategy.ParallelNoWait
            );
        }
    }

}