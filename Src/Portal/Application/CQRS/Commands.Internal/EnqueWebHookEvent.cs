using MediatR;
using Persistence.Portal;
using Domain.Server;
using Aplication.Core;
using Aplication.Services.Scheduler;
using Microsoft.EntityFrameworkCore;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// Command for transforming event to Webhook scheduled object
    /// </summary>
    public class EnqueWebHookEvent : CommandBase
    {
        // public EnqueWebHookEvent(HookEventGroup g, object e)
        // {
        //     // this.Flags.scheduled = true;

        //     EventGroup = g;
        //     Event = e;
        // }

        public HookEventGroup EventGroup { get; set; }
        public object Event { get; set; }
    }

    /// <summary>
    /// Command handler for <c>EnqueWebHooks</c>
    /// </summary>
    public class EnqueWebHooksHandler : IRequestHandler<EnqueWebHookEvent, Unit>
    {

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IScheduler</c>
        /// </summary>
        private readonly IScheduler _scheduler;

        /// <summary>
        /// Injected <c>IHttpClientFactory</c>
        /// </summary>
        private readonly IHttpClientFactory _clientFactory;

        /// <summary>
        /// Main Constructor
        /// </summary>
        public EnqueWebHooksHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IScheduler scheduler,
            IHttpClientFactory httpClient)
        {
            _factory = factory;
            _scheduler = scheduler;
            _clientFactory = httpClient;
        }

        /// <summary>
        /// Command handler for <c>EnqueWebHookEvent</c>
        /// </summary>
        public async Task<Unit> Handle(EnqueWebHookEvent request, CancellationToken cancellationToken)
        {

            if (request == null || request.Event == null)
            {
                throw new ArgumentNullException();
            }

            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            List<WebHook> hooks = await dbContext.WebHooks
            .AsNoTracking()
            .Where(e => e.IsActive == true)
            .ToListAsync(cancellationToken);

            if (hooks == null)
            {
                return Unit.Value;
            }

            // Temporary solution (Because of test postgressql supports projection on array)
            hooks = hooks.Where(e => e.EventGroup.Contains(request.EventGroup)).ToList();

            try
            {
                if (hooks != null)
                {
                    foreach (var hook_item in hooks)
                    {
                        if (hook_item.IsActive && hook_item.Id > 0)
                        {
                            try
                            {
                                _scheduler.Enqueue(new ProcessWebHook()
                                {
                                    HookId = hook_item.Id,
                                    Event = request.Event,
                                    EventGroup = request.EventGroup
                                });
                            }
                            catch { }
                        }
                    }
                }
            }
            catch { }


            return Unit.Value;
        }
    }
}