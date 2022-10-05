using MediatR;
using AutoMapper;
using Persistence;
using Aplication.DTO;
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
    /// SetServerLocation
    /// </summary>
    // [Authorize]
    public class SetServerLocation
        : CommandBase<DTO_Server>
    {
#nullable disable
        public string UID;

        public string Location;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - SetServerLocation
    /// </summary>
    public class SetServerLocationValidator
        : AbstractValidator<SetServerLocation>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public SetServerLocationValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.UID)
            .NotEmpty()
            .NotNull()
            .MustAsync(Exist).WithMessage("Server not found");

            RuleFor(e => e.Location)
            .NotNull();
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
    /// Authorization validators - SetServerLocation
    /// </summary>
    public class SetServerLocationAuthorizationValidator
        : AuthorizationValidator<SetServerLocation>
    {
        public SetServerLocationAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SetServerLocationHandler</c> command </summary>
    public class SetServerLocationHandler
        : IRequestHandler<SetServerLocation, DTO_Server>
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
        public SetServerLocationHandler(
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
        /// Command handler for <c>SetServerLocation</c>
        /// </summary>
        public async Task<DTO_Server> Handle(
            SetServerLocation request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server = await dbContext.Servers
                .Where(e => e.UID == request.UID)
                .FirstAsync(cancellationToken);

            server.Location = request.Location;

            dbContext.Servers.Update(server);

            await dbContext.SaveChangesAsync(cancellationToken);

            var mapped_server_dto = _mapper.Map<DTO_Server>(server);

            return mapped_server_dto;
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class SetServerLocation_PostProcessor
        : IRequestPostProcessor<SetServerLocation, DTO_Server>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public SetServerLocation_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            SetServerLocation request,
            DTO_Server response,
            CancellationToken cancellationToken
        )
        {
            await _publisher.Publish<ServerLocationUpdatedNotifi>(
                new ServerLocationUpdatedNotifi(
                    response.Guid
                ),
                Services.PublishStrategy.ParallelNoWait
            );
        }
    }

}