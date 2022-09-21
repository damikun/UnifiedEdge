using MediatR;
using AutoMapper;
using Persistence;
using Domain.Server;
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
    /// CreateServer
    /// </summary>
    // [Authorize]
    public class CreateServer : CommandBase<DTO_Server>
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
    public class CreateServerHandler : IRequestHandler<CreateServer, DTO_Server>
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
        public CreateServerHandler(
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
        /// Command handler for <c>CreateServer</c>
        /// </summary>
        public async Task<DTO_Server> Handle(CreateServer request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var new_server = await GetServer(request);

            dbContext.Servers.Add(new_server);

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_Server>(new_server);
        }

        private async Task<ServerBase> GetServer(CreateServer request)
        {
            ServerBase base_server;

            var endpoint = await _endpoint_provider.GetRanodmEndpoint();
            var uid = Guid.NewGuid().ToString();

            switch (request.Type)
            {
                case ServerType.mqtt:
                    base_server = new MqttServer()
                    {
                        UID = uid,
                        Created = DateTime.Now,
                        Cfg = new MqttServerCfg()
                        {
                            ServerUID = uid
                        },
                    };

                    break;

                case ServerType.opc:
                    base_server = new OpcServer()
                    {
                        UID = uid,
                        Created = DateTime.Now,
                        Cfg = new OpcServerCfg()
                        {
                            ServerUID = uid
                        },
                    };

                    break;

                default: throw new Exception("Unsupported server type");
            }

            base_server.Endpoints.Add(new ServerIPv4Endpoint()
            {
                IpAddress = endpoint.Address.ToString(),
                Port = endpoint.Port
            });

            base_server.Name = request.Name;
            base_server.Description = request.Description;
            base_server.Updated = base_server.Created;

            return base_server;
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class CreateServer_PostProcessor
        : IRequestPostProcessor<CreateServer, DTO_Server>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public CreateServer_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            CreateServer request,
            DTO_Server response,
            CancellationToken cancellationToken
        )
        {
            try
            {
                await _publisher.Publish<ServerCreatedNotifi>(
                    new ServerCreatedNotifi(response.Guid),
                    Services.PublishStrategy.ParallelNoWait
                );
            }
            catch (Exception ex)
            {
                // Log?
            }
        }
    }

}