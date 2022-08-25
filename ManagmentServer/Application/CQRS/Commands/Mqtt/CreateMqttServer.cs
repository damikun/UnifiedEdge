using MediatR;
using AutoMapper;
using Persistence;
using Server.Domain;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Aplication.Services;
using Aplication.CQRS.Behaviours;
using Aplication.Events.MqttServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// CreateMqttServer
    /// </summary>
    // [Authorize]
    public class CreateMqttServer : CommandBase<DTO_MqttServer>
    {
#nullable disable
        public string Name;
#nullable enable
        public string? Description;

        public int Port { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - CreateMqttServer
    /// </summary>
    public class CreateMqttServerValidator : AbstractValidator<CreateMqttServer>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public CreateMqttServerValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.Name)
            .NotEmpty()
            .NotNull()
            .MinimumLength(3);

            RuleFor(e => e.Port)
            .GreaterThan(0)
            .LessThanOrEqualTo(60000)
            .MustAsync(BeUniquePort).WithMessage("Port is allready taken");
        }

        public async Task<bool> BeUniquePort(
            int port,
            CancellationToken cancellationToken)
        {

            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers.AllAsync(e => e.Port != port);
        }

    }

    /// <summary>
    /// Authorization validators - CreateMqttServer
    /// </summary>
    public class CreateMqttServerAuthorizationValidator : AuthorizationValidator<CreateMqttServer>
    {
        public CreateMqttServerAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>CreateMqttServerHandler</c> command </summary>
    public class CreateMqttServerHandler : IRequestHandler<CreateMqttServer, DTO_MqttServer>
    {

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Main constructor
        /// </summary>
        public CreateMqttServerHandler(IDbContextFactory<ManagmentDbCtx> factory, IMapper mapper)
        {
            _factory = factory;

            _mapper = mapper;
        }

        /// <summary>
        /// Command handler for <c>CreateMqttServer</c>
        /// </summary>
        public async Task<DTO_MqttServer> Handle(CreateMqttServer request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var new_db_obj = new MqttServer()
            {
                Guid = Guid.NewGuid().ToString(),
                Name = request.Name,
                Description = request.Description,
                Port = request.Port,
                Created = DateTime.Now,
                Updated = DateTime.Now
            };

            dbContext.Add(new_db_obj);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_MqttServer>(new_db_obj);
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class CreateMqttServer_PostProcessor
        : IRequestPostProcessor<CreateMqttServer, DTO_MqttServer>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public CreateMqttServer_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            CreateMqttServer request,
            DTO_MqttServer response,
            CancellationToken cancellationToken)
        {
            if (response != null)
            {
                await _publisher.Publish(
                    new MqttServerCreatedNotifi(response.Guid),
                    PublishStrategy.ParallelNoWait, default(CancellationToken)
                );
            }
        }
    }

}