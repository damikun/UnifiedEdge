using Server;
using MediatR;
using AutoMapper;
using Server.Manager;
using Aplication.Core;
using MediatR.Pipeline;
using Persistence.Portal;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// InitServerManagers
    /// </summary>
    public class InitServerManagers
        : CommandBase<Unit>
    {
        public InitServerManagers()
        {
            this.Flags.diable_tracing = true;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>InitServerManagersHandler</c> command </summary>
    public class InitServerManagersHandler
        : IRequestHandler<InitServerManagers, Unit>
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
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        /// <summary>
        /// Injected <c>IServerEventPublisher</c>
        /// </summary>
        private readonly IServerEventPublisher _server_e_publisher;

        /// <summary>
        /// Injected <c>IConfigMapper</c>
        /// </summary>
        private readonly IConfigMapper _cfg_maper;

        // Internal flag detectin job was triggered. This is one time job on app start!
        private static bool processed { get; set; }

        /// <summary>
        /// Main constructor
        /// </summary>
        public InitServerManagersHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            IMediator mediator,
            IEndpointProvider endpoint_provider,
            IServerFascade fascade,
            IConfigMapper cfg_maper,
            IServerEventPublisher server_e_publisher
        )
        {
            _factory = factory;

            _mapper = mapper;

            _mediator = mediator;

            _endpoint_provider = endpoint_provider;

            _server_e_publisher = server_e_publisher;

            _fascade = fascade;

            _cfg_maper = cfg_maper;
        }

        /// <summary>
        /// Command handler for <c>InitServerManagers</c>
        /// </summary>
        public async Task<Unit> Handle(InitServerManagers request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            if (processed)
            {
                return Unit.Value;
            }

            var servers = await dbContext.Servers
            .TagWith("ServerManager init process -> Query all servers")
            .AsNoTracking()
            .Include(e => e.Cfg)
            .ToListAsync(cancellationToken);

            foreach (var server_base in servers)
            {
                try
                {
                    var manager = _fascade.GetManager(server_base.Type);

                    IServerCfg cfg;

                    try
                    {
                        cfg = await _cfg_maper.Map(
                            server_base.Cfg,
                            cancellationToken
                        );
                    }
                    catch (Exception ex)
                    {
                        _server_e_publisher.PublishError(
                            server_base.UID,
                            "Invalid server config",
                            ex
                        );

                        continue;
                    }

                    var server = manager.CreateServer(cfg);

                    await manager.AddServer(server);

                    await TryEnableLogging(
                        manager,
                        server.UID,
                        server_base.EnableLogging
                    );

                    try
                    {
                        // Todo ? Autostrat?
                    }
                    catch (Exception ex)
                    {
                        _server_e_publisher.PublishError(server_base.UID, "Failed to start server", ex);
                        continue;
                    }
                }
                catch (Exception ex)
                {
                    _server_e_publisher.PublishError(server_base.UID, "Dailed to add server to manager", ex);
                    continue;
                }
            }

            processed = true;

            return Unit.Value;
        }

        public Task TryEnableLogging(IServerManager manager, string server_uid, bool enable_logging)
        {
            try
            {
                return manager.EnableLogging(server_uid, enable_logging);
            }
            catch
            {

            }

            return Task.CompletedTask;
        }
    }


    //---------------------------------------
    //---------------------------------------


    public class InitServerManagers_PostProcessor
        : IRequestPostProcessor<InitServerManagers, Unit>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public InitServerManagers_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            InitServerManagers request,
            Unit unit,
            CancellationToken cancellationToken
        )
        {
            try
            {

            }
            catch (Exception ex)
            {
                // Log?
            }
        }
    }

}