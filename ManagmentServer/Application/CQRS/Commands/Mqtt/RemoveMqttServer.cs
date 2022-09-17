using MediatR;
using AutoMapper;
using Persistence;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Server.Manager.Mqtt;
using Aplication.Services;
using Aplication.Events.Server;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Server.Manager;
using Server.Mqtt;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// RemoveMqttServer
    /// </summary>
    // [Authorize]
    public class RemoveMqttServer : CommandBase<string>
    {
#nullable disable
        public string Id;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - RemoveMqttServer
    /// </summary>
    public class RemoveMqttServerValidator : AbstractValidator<RemoveMqttServer>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public RemoveMqttServerValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.Id)
            .NotEmpty()
            .NotNull();
        }
    }

    /// <summary>
    /// Authorization validators - RemoveMqttServer
    /// </summary>
    public class RemoveMqttServerAuthorizationValidator : AuthorizationValidator<RemoveMqttServer>
    {
        public RemoveMqttServerAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>RemoveMqttServerHandler</c> command </summary>
    public class RemoveMqttServerHandler : IRequestHandler<RemoveMqttServer, string>
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
        public RemoveMqttServerHandler(IDbContextFactory<ManagmentDbCtx> factory, IMapper mapper)
        {
            _factory = factory;

            _mapper = mapper;
        }

        /// <summary>
        /// Command handler for <c>RemoveMqttServer</c>
        /// </summary>
        public async Task<string> Handle(
            RemoveMqttServer request,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var enity = await dbContext.Servers
                .OfType<Domain.Server.MqttServer>()
                .Where(e => e.UID == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (enity == null)
            {
                throw new Exception(string.Format("MqttServer with id:{0} was not found", request.Id));
            }

            dbContext.Servers
            .Remove(enity);

            await dbContext.SaveChangesAsync(cancellationToken);

            return request.Id;
        }
    }

    public class RemoveServerFromMqttManagerPostProcessor
        : IRequestPostProcessor<RemoveMqttServer, string>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        /// <summary>
        /// Injected <c>IServerManager</c>
        /// </summary>
        private readonly IServerManager _mqtt_manager;

        /// <summary>
        /// Injected <c>ITelemetry</c>
        /// </summary>
        private readonly ITelemetry _telemetry;


        public RemoveServerFromMqttManagerPostProcessor(
            Aplication.Services.IPublisher publisher,
            IServerManager mqtt_manager,
            ITelemetry telemetry)
        {
            _publisher = publisher;

            _mqtt_manager = mqtt_manager;

            _telemetry = telemetry;
        }

        public async Task Process(
            RemoveMqttServer request,
            string removed_guid,
            CancellationToken cancellationToken)
        {

            if (!string.IsNullOrWhiteSpace(removed_guid))
            {
                await _publisher.Publish(
                    new ServerRemovedNotifi(removed_guid),
                    PublishStrategy.ParallelNoWait, default(CancellationToken)
                );
            }
        }
    }
}