using Server;
using MediatR;
using AutoMapper;
using Persistence;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Server.Manager.Mqtt;
using Aplication.CQRS.Queries;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Server.Manager;
using Server.Mqtt;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// ServerCmd
    /// </summary>
    // [Authorize]
    public class ProcessServerCmd : CommandBase<Unit>
    {
#nullable disable
        public string Guid;
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

            RuleFor(e => e.Guid)
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
        /// Injected <c>IServerManager</c>
        /// </summary>
        private readonly IServerManager _mqtt_manager;


        /// <summary>
        /// Main constructor
        /// </summary>
        public ServerCmdHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            IServerManager mqtt_manager,
            IMediator mediator)
        {
            _factory = factory;

            _mapper = mapper;

            _mediator = mediator;

            _mqtt_manager = mqtt_manager;
        }

        /// <summary>
        /// Command handler for <c>ProcessServerCmd</c>
        /// </summary>
        public async Task<Unit> Handle(ProcessServerCmd request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            //--------------

            var server_db = await _mediator.Send(
                new GetServer()
                {
                    Guid = request.Guid
                });

            //--------------

            switch (server_db)
            {
                case DTO_MqttServer:
                    await _mqtt_manager.ProcesCommand(
                        request.Guid,
                        request.Command);
                    break;

                case DTO_OpcServer:
                    await _mqtt_manager.ProcesCommand(
                        request.Guid,
                        request.Command);
                    break;

                default:
                    throw new Exception("Unsupported Server Type");
            }

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