using MediatR;
using AutoMapper;
using HotChocolate.Resolvers;
using Aplication.GraphQL.DTO;
using Aplication.DTO.Scheduler;
using HotChocolate.Types.Pagination;
using Aplication.CQRS.Queries.Scheduler;

namespace Aplication.Graphql.Queries
{
    /// <summary>
    /// SchedulerQueries
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Query)]
    public class SchedulerQueries
    {

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        public SchedulerQueries(IMapper mapper)
        {
            _mapper = mapper;
        }

        /// <summary>
        /// Scheduler failed jobs
        /// </summary>
        /// <returns>Connection of GQL_FailedJob</returns>
        [UseConnection(typeof(GQL_FailedJob))]
        public async Task<Connection<GQL_FailedJob>> GetFailedJobs(
            IResolverContext ctx,
            [Service] IMapper mapper,
            [Service] IMediator mediator,
            CancellationToken cancellationToken
        )
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new SchedulerGetFailedJobs(arguments),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_FailedJob>>(result);
        }

        /// <summary>
        /// Scheduler success jobs
        /// </summary>
        /// <returns>Connection of GQL_FailedJob</returns>
        [UseConnection(typeof(GQL_SuccessJob))]
        public async Task<Connection<GQL_SuccessJob>> GetSuccessJobs(
            IResolverContext ctx,
            [Service] IMapper mapper,
            [Service] IMediator mediator,
            CancellationToken cancellationToken
        )
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new SchedulerGetSuccessJobs(arguments),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_SuccessJob>>(result);
        }

        /// <summary>
        /// Scheduler recurring jobs
        /// </summary>
        /// <returns>Connection of GQL_RecurringJob</returns>
        [UseConnection(typeof(GQL_RecurringJob))]
        public async Task<Connection<GQL_RecurringJob>> GetRecurringJobs(
            IResolverContext ctx,
            [Service] IMapper mapper,
            [Service] IMediator mediator,
            CancellationToken cancellationToken
        )
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new SchedulerGetRecurringJobs(arguments),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_RecurringJob>>(result);
        }

        /// <summary>
        /// Scheduler jobs statistic
        /// </summary>
        /// <returns>GQL_JobsStatistic</returns>
        public async Task<GQL_JobsStatistic> GetJobsStatistic(
            [Service] IMapper mapper,
            [Service] IMediator mediator)
        {
            return mapper.Map<DTO_SchedulerStatistic, GQL_JobsStatistic>(
                await mediator.Send(new SchedulerGetStatistic())
            );
        }

        /// <summary>
        /// Return failed job by job id
        /// </summary>
        /// <param name="jobid"></param>
        /// <returns>GQL_FailedJob</returns>
        public async Task<GQL_FailedJob> GetFailedJob(
        [ID] string jobid,
        [Service] IMapper mapper,
        [Service] IMediator mediator)
        {

            var job = await mediator.Send(
                new SchedulerGetFailedJobById() { jobid = jobid }
            );

            return mapper.Map<DTO_FailedJob, GQL_FailedJob>(job);
        }

        /// <summary>
        /// Return success job by job id
        /// </summary>
        /// <param name="jobid"></param>
        /// <returns>GQL_SuccessJob</returns>
        public async Task<GQL_SuccessJob> GetSuccessJob(
        [ID] string jobid,
        [Service] IMapper mapper,
        [Service] IMediator mediator)
        {

            var job = await mediator.Send(
                new SchedulerGetSuccessJobById() { jobid = jobid }
            );

            return mapper.Map<DTO_SuccessJob, GQL_SuccessJob>(job);
        }


        /// <summary>
        /// Return recurring job by job id
        /// </summary>
        /// <param name="jobid"></param>
        /// <returns>GQL_RecurringJob</returns>
        public async Task<GQL_RecurringJob> GetRecurringJob(
        [ID] string jobid,
        [Service] IMapper mapper,
        [Service] IMediator mediator)
        {
            var job = await mediator.Send(
                new SchedulerGetRecurringJobById() { jobid = jobid }
            );

            return mapper.Map<DTO_RecurringJob, GQL_RecurringJob>(job);
        }
    }
}