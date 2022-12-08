using MediatR;
using AutoMapper;
using Aplication.Core;
using Persistence.Portal;
using Microsoft.EntityFrameworkCore;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// CleanMqttAuthLogs
    /// </summary>
    public class CleanMqttAuthLogs : CommandBase<Unit>
    {
        public CleanMqttAuthLogs()
        {
            this.Flags.diable_tracing = true;
            this.Flags.long_running = true;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>CleanMqttAuthLogsHandler</c> command </summary>
    public class CleanMqttAuthLogsHandler : IRequestHandler<CleanMqttAuthLogs, Unit>
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

        public const int MAX_NUMBER_OF_LOGS_FOR_SERVER = 100;

        /// <summary>
        /// Main constructor
        /// </summary>
        public CleanMqttAuthLogsHandler(
            IMapper mapper,
            IMediator mediator,
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _mapper = mapper;

            _mediator = mediator;

            _factory = factory;
        }

        /// <summary>
        /// Command handler for <c>CleanMqttAuthLogs</c>
        /// </summary>
        public async Task<Unit> Handle(
            CleanMqttAuthLogs request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server_ids = await dbContext.Servers
            .AsNoTracking()
            .Select(e => e.ID)
            .ToListAsync(cancellationToken);

            foreach (var id in server_ids)
            {
                try
                {
                    var logs = await dbContext.MqttAuthLogs
                    .Where(e => e.ServerId == id)
                    .OrderByDescending(e => e.TimeStamp)
                    .Skip(MAX_NUMBER_OF_LOGS_FOR_SERVER)
                    .ToListAsync();

                    foreach (var enity in logs)
                    {
                        dbContext.MqttAuthLogs.Remove(enity);
                    }

                    await dbContext.SaveChangesAsync(cancellationToken);
                }
                catch { }
            }

            try
            {
                var unknown_logs = await dbContext.MqttAuthLogs
                .Where(e => !server_ids.Contains(e.Id))
                .ToListAsync();

                foreach (var enity in unknown_logs)
                {
                    dbContext.MqttAuthLogs.Remove(enity);
                }

                await dbContext.SaveChangesAsync(cancellationToken);
            }
            catch { }

            return Unit.Value;
        }
    }
}