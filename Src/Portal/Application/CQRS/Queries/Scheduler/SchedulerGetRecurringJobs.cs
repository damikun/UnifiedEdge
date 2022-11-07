using MediatR;
using Hangfire;
using AutoMapper;
using Persistence.Portal;
using Aplication.DTO;
using Aplication.Core;
using Hangfire.Storage;
using FluentValidation;
using Aplication.Interfaces;
using Aplication.DTO.Scheduler;
using Aplication.CQRS.Behaviours;
using Aplication.Core.Pagination;
using Microsoft.EntityFrameworkCore;


namespace Aplication.CQRS.Queries.Scheduler
{

    /// <summary>
    /// Query Scheduler Recurring Jobs
    /// </summary>
    public class SchedulerGetRecurringJobs
        : CommandBase<DTO_Connection<DTO_RecurringJob>>
    {
        public SchedulerGetRecurringJobs(CursorArguments arguments)
        {
            Arguments = arguments;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// SchedulerGetRecurringJobsValidator Field Validator
    /// </summary>
    public class SchedulerGetRecurringJobsValidator
        : AbstractValidator<SchedulerGetRecurringJobs>
    {
        public SchedulerGetRecurringJobsValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// SchedulerGetRecurringJobsValidator Field Authorization validator
    /// </summary>
    public class SchedulerGetRecurringJobsValidatorAuthorizationValidator
        : AuthorizationValidator<SchedulerGetRecurringJobs>
    {
        public SchedulerGetRecurringJobsValidatorAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SchedulerGetRecurringJobs</c> command </summary>
    public class SchedulerGetRecurringJobsHandler
        : IRequestHandler<SchedulerGetRecurringJobs, DTO_Connection<DTO_RecurringJob>>
    {

        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx></c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>ICursorPagination</c>
        /// </summary>
        private readonly ICursorPagination<DTO_RecurringJob> _cursor_provider;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public SchedulerGetRecurringJobsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<DTO_RecurringJob> cursor_provider
        )
        {
            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>SchedulerGetRecurringJobs</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_RecurringJob>> Handle(
            SchedulerGetRecurringJobs request,
            CancellationToken cancellationToken
        )
        {
            IQueryable<DTO_RecurringJob>? jobs_queriable;

            using (var connection = JobStorage.Current.GetConnection())
            {
                List<RecurringJobDto> RecurringJobs = connection.GetRecurringJobs();

                if (RecurringJobs != null)
                {
                    jobs_queriable = RecurringJobs.Select(e => new DTO_RecurringJob()
                    {
                        ID = e.Id,
                        CallName = SchedulerHelpers.JobName(e.Job) ?? "Unknown",
                        Cron = e.Cron,
                        Queue = e.Queue,
                        NextExecution = e.NextExecution,
                        LastExecution = e.LastExecution,
                        CreatedAt = e.CreatedAt,
                        LastJobId = e.LastJobId,
                        LastJobState = e.LastJobState,
                        Removed = e.Removed,
                        TimeZoneId = e.TimeZoneId,
                        Error = e.Error,
                        RetryAttempt = e.RetryAttempt,
                    }).ToList().AsQueryable();

                }
                else
                {
                    jobs_queriable = new List<DTO_RecurringJob>().AsQueryable();
                }
            }

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                jobs_queriable,
                request.Arguments,
                (ct) => Task.FromResult(jobs_queriable.Count()),
                cancellationToken
            );

            var totalcount = jobs_queriable.Count();

            return new DTO_Connection<DTO_RecurringJob>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };

        }
    }
}