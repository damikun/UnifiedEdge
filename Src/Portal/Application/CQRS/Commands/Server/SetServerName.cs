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
    /// SetServerName
    /// </summary>
    [Authorize]
    public class SetServerName
        : CommandBase<(DTO_Server server, string old_name)>
    {
#nullable disable
        public string UID;

        public string Name;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - SetServerName
    /// </summary>
    public class SetServerNameValidator
        : AbstractValidator<SetServerName>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public SetServerNameValidator(
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

            RuleFor(e => e.Name)
            .NotEmpty()
            .NotNull()
            .MinimumLength(3)
            .MaximumLength(20);

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
    /// Authorization validators - SetServerName
    /// </summary>
    public class SetServerNameAuthorizationValidator
        : AuthorizationValidator<SetServerName>
    {
        public SetServerNameAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SetServerNameHandler</c> command </summary>
    public class SetServerNameHandler
        : IRequestHandler<
            SetServerName,
            (DTO_Server server, string old_name)
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
        public SetServerNameHandler(
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
        /// Command handler for <c>SetServerName</c>
        /// </summary>
        public async Task<(DTO_Server server, string old_name)> Handle(
            SetServerName request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server = await dbContext.Servers
                .Where(e => e.UID == request.UID)
                .FirstAsync(cancellationToken);

            string old_name = server.Name;

            server.Name = request.Name;

            dbContext.Servers.Update(server);

            await dbContext.SaveChangesAsync(cancellationToken);

            var mapped_server_dto = _mapper.Map<DTO_Server>(server);

            return (mapped_server_dto, old_name);
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class SetServerName_PostProcessor
        : IRequestPostProcessor<
            SetServerName,
            (DTO_Server server, string old_name)
        >
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public SetServerName_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            SetServerName request,
            (DTO_Server server, string old_name) response,
            CancellationToken cancellationToken
        )
        {
            await _publisher.Publish<ServerNameUpdatedNotifi>(
                new ServerNameUpdatedNotifi(
                    response.server.Guid,
                    response.old_name,
                    response.server.Name
                ),
                Services.PublishStrategy.ParallelNoWait
            );
        }
    }

}