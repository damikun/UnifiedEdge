using MediatR;
using Hangfire;
using AutoMapper;
using Persistence;
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
    /// Query Scheduler Success Jobs
    /// </summary>
    public class SchedulerGetSuccessJobs
        : CommandBase<DTO_Connection<DTO_SuccessJob>>
    {
        public SchedulerGetSuccessJobs(CursorArguments arguments)
        {
            Arguments = arguments;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// SchedulerGetSuccessJobsValidator Field Validator
    /// </summary>
    public class SchedulerGetSuccessJobsValidator
        : AbstractValidator<SchedulerGetSuccessJobs>
    {
        public SchedulerGetSuccessJobsValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// SchedulerGetSuccessJobsValidator Field Authorization validator
    /// </summary>
    public class SchedulerGetSuccessJobsValidatorAuthorizationValidator
        : AuthorizationValidator<SchedulerGetSuccessJobs>
    {
        public SchedulerGetSuccessJobsValidatorAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SchedulerGetSuccessJobs</c> command </summary>
    public class SchedulerGetSuccessJobsHandler
        : IRequestHandler<SchedulerGetSuccessJobs, DTO_Connection<DTO_SuccessJob>>
    {

        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx></c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>ICursorPagination</c>
        /// </summary>
        private readonly ICursorPagination<DTO_SuccessJob> _cursor_provider;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public SchedulerGetSuccessJobsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<DTO_SuccessJob> cursor_provider
        )
        {
            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>SchedulerGetSuccessJobs</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_SuccessJob>> Handle(
            SchedulerGetSuccessJobs request,
            CancellationToken cancellationToken
        )
        {
            JobList<Hangfire.Storage.Monitoring.SucceededJobDto> joblist;

            IMonitoringApi monitor = JobStorage.Current.GetMonitoringApi();

            joblist = monitor.SucceededJobs(0, 250);

            var jobs = joblist
            .Where(e => e.Value != null && e.Key != null)
            .Select(item => new DTO_SuccessJob()
            {
                ID = item.Key,
                Name = item.Value.Job != null ? SchedulerHelpers.JobName(item.Value.Job) ?? "Unknown" : "Unknown",
                TotalDuration = item.Value.TotalDuration,
                SucceededAt = item.Value.SucceededAt,
                InSucceededState = item.Value.InSucceededState,
            }).AsQueryable();

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                jobs,
                request.Arguments,
                (ct) => Task.FromResult(jobs.Count()),
                cancellationToken
            );

            var totalcount = joblist.Count();

            return new DTO_Connection<DTO_SuccessJob>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };

        }
    }
}