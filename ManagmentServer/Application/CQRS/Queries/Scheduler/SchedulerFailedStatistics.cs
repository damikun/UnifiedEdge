using MediatR;
using Hangfire;
using AutoMapper;
using Persistence;
using Aplication.Core;
using Hangfire.Storage;
using FluentValidation;
using Aplication.Interfaces;
using Aplication.DTO.Scheduler;
using Aplication.CQRS.Behaviours;
using Hangfire.Storage.Monitoring;
using Microsoft.EntityFrameworkCore;

namespace Aplication.CQRS.Queries.Scheduler
{

    /// <summary>
    /// Query Scheduler Failed Job Statistics
    /// </summary>
    public class SchedulerFailedStatitic
        : CommandBase<List<DTO_CountByDate>>
    {

    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// SchedulerFailedStatiticValidator Field Validator
    /// </summary>
    public class SchedulerFailedStatiticValidator
        : AbstractValidator<SchedulerFailedStatitic>
    {
        public SchedulerFailedStatiticValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// SchedulerFailedStatiticValidator Field Authorization validator
    /// </summary>
    public class SchedulerFailedStatiticValidatorAuthorizationValidator
        : AuthorizationValidator<SchedulerFailedStatitic>
    {
        public SchedulerFailedStatiticValidatorAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SchedulerFailedStatitic</c> command </summary>
    public class SchedulerFailedStatiticHandler
        : IRequestHandler<SchedulerFailedStatitic, List<DTO_CountByDate>>
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
        public SchedulerFailedStatiticHandler(
            IMapper mapper,
            IDbContextFactory<ManagmentDbCtx> factory,
            ICursorPagination<DTO_SuccessJob> cursor_provider
        )
        {
            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>SchedulerFailedStatitic</c>
        /// </summary>
        public async Task<List<DTO_CountByDate>> Handle(
            SchedulerFailedStatitic request,
            CancellationToken cancellationToken
        )
        {
            try
            {

                JobList<Hangfire.Storage.Monitoring.FailedJobDto> joblist;

                IMonitoringApi monitor = JobStorage.Current.GetMonitoringApi();

                IDictionary<DateTime, long> records = monitor.FailedByDatesCount();

                List<DTO_CountByDate> response = records.Select(e => new DTO_CountByDate()
                {
                    Date = e.Key,
                    Count = e.Value
                }).ToList();

                return response;

            }
            catch
            {
                return new List<DTO_CountByDate>();
            }
        }
    }
}