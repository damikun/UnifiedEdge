using MediatR;
using AutoMapper;
using Persistence;
using Domain.Server;
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
    /// CreateServer
    /// </summary>
    // [Authorize]
    public class CreateServer : CommandBase<Unit>
    {
#nullable disable
        public string Name;
#nullable enable
        public string? Description;

        public ServerType Type;
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - CreateServer
    /// </summary>
    public class CreateServerValidator : AbstractValidator<CreateServer>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public CreateServerValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.Name)
            .NotEmpty()
            .NotNull()
            .MinimumLength(3);
        }

    }

    /// <summary>
    /// Authorization validators - CreateServer
    /// </summary>
    public class CreateServerAuthorizationValidator : AuthorizationValidator<CreateServer>
    {
        public CreateServerAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>CreateServerHandler</c> command </summary>
    public class CreateServerHandler : IRequestHandler<CreateServer, Unit>
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
        /// Main constructor
        /// </summary>
        public CreateServerHandler(
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
        /// Command handler for <c>CreateServer</c>
        /// </summary>
        public async Task<Unit> Handle(CreateServer request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            ServerBase new_server;

            var m = _fascade.GetManagerByServerName("somename");

            // Load somehow default config

            var server = m.CreateServer(null);


            // switch (request.Type)
            // {
            //     case ServerType.mqtt:
            //         new_server = new MqttServer()
            //         {
            //             Name = request.Name,
            //             Description = request.Description,
            //         };

            //     case ServerType.opc:
            //         new_server = new CreateOpcServer()
            //         {
            //             Name = request.Name,
            //             Description = request.Description,
            //         };

            //     default: throw new Exception("Unsupported server type");
            // }

            // await _fascade.ProcesCommand(request.UID, request.Command);

            return Unit.Value;
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class CreateServer_PostProcessor
        : IRequestPostProcessor<CreateServer, Unit>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public CreateServer_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            CreateServer request,
            Unit response,
            CancellationToken cancellationToken)
        {
            // To be implemented

            await Task.CompletedTask;
        }
    }

}