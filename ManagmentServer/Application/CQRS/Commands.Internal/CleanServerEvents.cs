using MediatR;
using AutoMapper;
using Persistence;
using Domain.Server;
using Aplication.Core;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// CleanServerEvents
    /// </summary>
    public class CleanServerEvents : CommandBase<Unit>
    {
        public CleanServerEvents()
        {
            this.Flags.diable_tracing = true;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>CleanServerEventsHandler</c> command </summary>
    public class CleanServerEventsHandler : IRequestHandler<CleanServerEvents, Unit>
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

        public const int MAX_NUMBER_OF_EVENTS = 100;

        /// <summary>
        /// Main constructor
        /// </summary>
        public CleanServerEventsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            IMediator mediator,
            IEndpointProvider endpoint_provider,
            IServerFascade fascade
        )
        {
            _factory = factory;

            _mapper = mapper;

            _mediator = mediator;

            _endpoint_provider = endpoint_provider;

            _fascade = fascade;
        }

        /// <summary>
        /// Command handler for <c>CleanServerEvents</c>
        /// </summary>
        public async Task<Unit> Handle(CleanServerEvents request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server_ids = await dbContext.ServerEvents
            .TagWith("ServerEvents cleanup -> Query all server ids")
            .AsNoTracking()
            .Select(e => e.ServerUid)
            .Distinct()
            .ToListAsync(cancellationToken);

            foreach (var uid in server_ids)
            {
                if (string.IsNullOrWhiteSpace(uid))
                {
                    continue;
                }

                try
                {
                    var total_count = await dbContext.ServerEvents
                    .AsNoTracking()
                    .TagWith("ServerEvents cleanup -> Query totalCount specific server events")
                    .Where(e => e.ServerUid == uid)
                    .CountAsync(cancellationToken);

                    var num_to_delete = total_count - MAX_NUMBER_OF_EVENTS;

                    if (num_to_delete <= 0)
                    {
                        continue;
                    }

                    var server_records = await dbContext.ServerEvents
                    .TagWith("ServerEvents cleanup -> Query specific number of events")
                    .Where(e => e.ServerUid == uid)
                    .Take(num_to_delete)
                    .ToListAsync(cancellationToken);

                    dbContext.ServerEvents.RemoveRange(server_records);

                    await dbContext.SaveChangesAsync(cancellationToken);

                }
                catch (Exception ex)
                {
                    try
                    {
                        dbContext.ServerEvents.Add(
                            new ServerEvent(uid, ex, "Failed to cleanup events")
                        );

                        await dbContext.SaveChangesAsync();
                    }
                    catch
                    {
                        // Nothing
                    }
                }
            }


            return Unit.Value;
        }
    }
}