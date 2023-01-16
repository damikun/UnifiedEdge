using Server;
using MediatR;
using AutoMapper;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Portal;
using System.Diagnostics;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// ServerGroupCmd
    /// </summary>
    [Authorize(Policy = "write_access")]
    [Authorize(Policy = "authenticated_user")]
    public class ProcessServerGroupCmd : CommandBase<ServerGroupResult>
    {
        public ServerGroupCmd Command { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - ServerGroupCmd
    /// </summary>
    public class ServerGroupCmdValidator
        : AbstractValidator<ProcessServerGroupCmd>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public ServerGroupCmdValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            ClassLevelCascadeMode = CascadeMode.Stop;
        }
    }

    /// <summary>
    /// Authorization validators - ServerGroupCmd
    /// </summary>
    public class ServerGroupCmdAuthorizationValidator
        : AuthorizationValidator<ProcessServerGroupCmd>
    {
        public ServerGroupCmdAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>ServerGroupCmdHandler</c> command </summary>
    public class ServerGroupCmdHandler
        : IRequestHandler<ProcessServerGroupCmd, ServerGroupResult>
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
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        private static TimeSpan max_period = TimeSpan.FromSeconds(10);

        private volatile static SemaphoreSlim _gate = new SemaphoreSlim(1);

        /// <summary>
        /// Main constructor
        /// </summary>
        public ServerGroupCmdHandler(
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
        /// Command handler for <c>ProcessServerGroupCmd</c>
        /// </summary>
        public async Task<ServerGroupResult> Handle(ProcessServerGroupCmd request, CancellationToken cancellationToken)
        {
            try
            {
                bool hasErrorFlag = false;

                await using ManagmentDbCtx dbContext =
                    _factory.CreateDbContext();

                var ids = await _fascade.GetManagedIds();

                if (_gate.CurrentCount > 0)
                {
                    try
                    {
                        await _gate.WaitAsync(cancellationToken);

                        var cmd = request.Command == ServerGroupCmd.start ?
                            ServerCmd.start :
                            ServerCmd.stop;

                        Parallel.ForEach(ids, id =>
                        {
                            try
                            {
                                _fascade.ProcesCommand(id, cmd);
                            }
                            catch
                            {
                                hasErrorFlag = true;
                            }
                        });

                    }
                    finally
                    {
                        _gate.Release();
                    }
                }

                var done_flag = true;

                Stopwatch sw = Stopwatch.StartNew();

                do
                {
                    done_flag = true;

                    await Task.Delay(1500);

                    foreach (var id in ids)
                    {
                        try
                        {
                            var state = await _fascade.State(id);

                            if (state == ServerState.restarting ||
                            state == ServerState.starting ||
                            state == ServerState.stopping)
                            {
                                done_flag = false;
                            }
                        }
                        catch
                        {
                            done_flag = false;
                        }
                    }

                    if (sw.Elapsed >= max_period && !done_flag)
                    {
                        hasErrorFlag = true;
                    }


                } while (sw.Elapsed < max_period && !done_flag);

                return hasErrorFlag ?
                    ServerGroupResult.failed :
                    ServerGroupResult.done;
            }
            catch
            {
                return ServerGroupResult.failed;
            }
        }
    }

    //---------------------------------------
    //---------------------------------------


    public class ServerGroupCmd_PostProcessor
        : IRequestPostProcessor<ProcessServerGroupCmd, ServerGroupResult>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public ServerGroupCmd_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            ProcessServerGroupCmd request,
            ServerGroupResult result,
            CancellationToken cancellationToken)
        {
            // >
        }
    }
}