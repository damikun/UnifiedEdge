using MediatR;
using Aplication.CQRS.Queries.Scheduler;
using Microsoft.Extensions.DependencyInjection;

namespace Aplication.Graphql.DataLoaders
{

    public class JobStateByJobId_DataLoader : BatchDataLoader<string, string?>
    {

        /// <summary>
        /// Injected <c>IServiceProvider</c>
        /// </summary>
        private readonly IServiceProvider _services;

        public JobStateByJobId_DataLoader(
            IBatchScheduler scheduler,
            IServiceProvider services) : base(scheduler)
        {
            _services = services;

        }

        protected async override Task<IReadOnlyDictionary<string, string?>> LoadBatchAsync(
            IReadOnlyList<string> keys,
            CancellationToken cancellationToken)
        {

            var mediator = _services.GetRequiredService<IMediator>();

            try
            {
                return await mediator.Send(new SchedulerJobStateLoader(keys));
            }
            catch
            {
                return Empty()!;
            }
        }

        private IReadOnlyDictionary<string, string> Empty()
        {
            return new List<string>().ToDictionary(e => e, null);
        }
    }
}
