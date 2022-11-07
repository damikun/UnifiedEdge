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
using Hangfire.Storage.Monitoring;
using Microsoft.EntityFrameworkCore;

namespace Aplication.CQRS.Queries.Scheduler
{

    /// <summary>
    /// Query Scheduler Failed Jobs
    /// </summary>
    public class SchedulerGetFailedJobs
        : CommandBase<DTO_Connection<DTO_FailedJob>>
    {
        public SchedulerGetFailedJobs(CursorArguments arguments)
        {
            Arguments = arguments;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// SchedulerGetFailedJobsValidator Field Validator
    /// </summary>
    public class SchedulerGetFailedJobsValidator
        : AbstractValidator<SchedulerGetFailedJobs>
    {
        public SchedulerGetFailedJobsValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// SchedulerGetFailedJobsValidator Field Authorization validator
    /// </summary>
    public class SchedulerGetFailedJobsValidatorAuthorizationValidator
        : AuthorizationValidator<SchedulerGetFailedJobs>
    {
        public SchedulerGetFailedJobsValidatorAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SchedulerGetFailedJobs</c> command </summary>
    public class SchedulerGetFailedJobsHandler
        : IRequestHandler<SchedulerGetFailedJobs, DTO_Connection<DTO_FailedJob>>
    {

        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx></c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>ICursorPagination</c>
        /// </summary>
        private readonly ICursorPagination<DTO_FailedJob> _cursor_provider;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public SchedulerGetFailedJobsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<DTO_FailedJob> cursor_provider
        )
        {
            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>SchedulerGetFailedJobs</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_FailedJob>> Handle(
            SchedulerGetFailedJobs request,
            CancellationToken cancellationToken
        )
        {
            JobList<Hangfire.Storage.Monitoring.FailedJobDto> joblist;

            IMonitoringApi monitor = JobStorage.Current.GetMonitoringApi();

            joblist = monitor.FailedJobs(0, 250);

            var jobs = joblist
            .Where(e => e.Value != null && e.Key != null)
            .Select(item => new DTO_FailedJob()
            {
                ID = item.Key,
                Reason = item.Value.Reason,
                FailedAt = item.Value.FailedAt,
                JobName = item.Value?.Job != null ? SchedulerHelpers.JobName(item.Value.Job) : "Unknown",
                ExceptionType = item.Value.ExceptionType,
                ExceptionMessage = item.Value.ExceptionMessage,
                ExceptionDetails = item.Value.ExceptionDetails,
                InFailedState = item.Value.InFailedState
            }).AsQueryable();

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                jobs,
                request.Arguments,
                (ct) => Task.FromResult(jobs.Count()),
                cancellationToken
            );

            var totalcount = joblist.Count();

            return new DTO_Connection<DTO_FailedJob>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };

        }
    }
}