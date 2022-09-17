using MediatR;
using AutoMapper;
using Persistence;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Aplication.Services;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// CreateOpcServer
    /// </summary>
    // [Authorize]
    public class CreateOpcServer : CommandBase<DTO_OpcServer>
    {
#nullable disable
        public string Name;
#nullable enable
        public string? Description;
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - CreateOpcServer
    /// </summary>
    public class CreateOpcServerValidator :
        AbstractValidator<CreateOpcServer>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public CreateOpcServerValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.Name)
            .NotEmpty()
            .NotNull()
            .MinimumLength(3);

            // RuleFor(e => e.Port)
            // .GreaterThan(0)
            // .LessThanOrEqualTo(60000)
            // .MustAsync(BeUniquePort).WithMessage("Port is allready taken");
        }

        public async Task<bool> BeUniquePort(
            int port,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return false;
            // return await dbContext.Servers
            // .OfType<OpcServer>()
            // .AllAsync(e => e.Port != port);
        }

    }

    /// <summary>
    /// Authorization validators - CreateOpcServer
    /// </summary>
    public class CreateOpcServerAuthorizationValidator :
        AuthorizationValidator<CreateOpcServer>
    {
        public CreateOpcServerAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>CreateOpcServerHandler</c> command </summary>
    public class CreateOpcServerHandler :
        IRequestHandler<CreateOpcServer, DTO_OpcServer>
    {

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        const int MAX_SERVER_COUNTS = 5;

        /// <summary>
        /// Main constructor
        /// </summary>
        public CreateOpcServerHandler(IDbContextFactory<ManagmentDbCtx> factory, IMapper mapper)
        {
            _factory = factory;

            _mapper = mapper;
        }

        /// <summary>
        /// Command handler for <c>CreateOpcServer</c>
        /// </summary>
        public async Task<DTO_OpcServer> Handle(
            CreateOpcServer request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            //--------------

            int current_server_count = await dbContext.Servers.
                OfType<MqttServer>()
                .CountAsync(cancellationToken);

            if (current_server_count >= MAX_SERVER_COUNTS)
            {
                throw new Exception("Maximum allowd number of servers allready exist. No more can be created.");
            }

            //--------------     

            var new_db_obj = new OpcServer()
            {
                UID = Guid.NewGuid().ToString(),
                Name = request.Name,
                Description = request.Description,
                Created = DateTime.Now,
                Updated = DateTime.Now
            };

            dbContext.Add(new_db_obj);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_OpcServer>(new_db_obj);
        }

    }

    //---------------------------------------
    //---------------------------------------

    public class CreateOpcServer_PostProcessor
        : IRequestPostProcessor<CreateOpcServer, DTO_OpcServer>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public CreateOpcServer_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            CreateOpcServer request,
            DTO_OpcServer response,
            CancellationToken cancellationToken)
        {
            if (response != null)
            {
                // await _publisher.Publish(
                //     new OpcServerCreatedNotifi(response.Guid),
                //     PublishStrategy.ParallelNoWait, default(CancellationToken)
                // );
            }
        }
    }
}