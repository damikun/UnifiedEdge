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
    /// Query Scheduler Success Job Statistics
    /// </summary>
    public class SchedulerSuccessStatitic
        : CommandBase<List<DTO_CountByDate>>
    {

    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// SchedulerSuccessStatiticValidator Field Validator
    /// </summary>
    public class SchedulerSuccessStatiticValidator
        : AbstractValidator<SchedulerSuccessStatitic>
    {
        public SchedulerSuccessStatiticValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// SchedulerSuccessStatiticValidator Field Authorization validator
    /// </summary>
    public class SchedulerSuccessStatiticValidatorAuthorizationValidator
        : AuthorizationValidator<SchedulerSuccessStatitic>
    {
        public SchedulerSuccessStatiticValidatorAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SchedulerSuccessStatitic</c> command </summary>
    public class SchedulerSuccessStatiticHandler
        : IRequestHandler<SchedulerSuccessStatitic, List<DTO_CountByDate>>
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
        public SchedulerSuccessStatiticHandler(
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
        /// Command handler for <c>SchedulerSuccessStatitic</c>
        /// </summary>
        public async Task<List<DTO_CountByDate>> Handle(
            SchedulerSuccessStatitic request,
            CancellationToken cancellationToken
        )
        {
            try
            {

                JobList<Hangfire.Storage.Monitoring.SucceededJobDto> joblist;

                IMonitoringApi monitor = JobStorage.Current.GetMonitoringApi();

                IDictionary<DateTime, long> records = monitor.SucceededByDatesCount();

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