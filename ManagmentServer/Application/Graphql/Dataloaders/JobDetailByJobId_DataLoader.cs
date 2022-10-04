using MediatR;
using Aplication.DTO.Scheduler;
using Aplication.CQRS.Queries.Scheduler;
using Microsoft.Extensions.DependencyInjection;

namespace Aplication.Graphql.DataLoaders
{

    public class JobDetailByJobId_DataLoader : BatchDataLoader<string, GQL_JobDetail?>
    {

        /// <summary>
        /// Injected <c>IServiceProvider</c>
        /// </summary>
        private readonly IServiceProvider _services;

        public JobDetailByJobId_DataLoader(
            IBatchScheduler scheduler,
            IServiceProvider services) : base(scheduler)
        {
            _services = services;

        }

        protected async override Task<IReadOnlyDictionary<string, GQL_JobDetail?>> LoadBatchAsync(
            IReadOnlyList<string> keys,
            CancellationToken cancellationToken)
        {

            var mediator = _services.GetRequiredService<IMediator>();

            try
            {
                return await mediator.Send(new SchedulerJobsDetailLoader(keys));
            }
            catch
            {
                return Empty()!;
            }
        }

        private IReadOnlyDictionary<string, GQL_JobDetail?> Empty()
        {
            return new List<GQL_JobDetail?>().ToDictionary(e => e.JobId, null);
        }
    }
}
