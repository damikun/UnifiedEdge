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
    /// Query Scheduler Statistic
    /// </summary>
    public class SchedulerGetStatistic
        : CommandBase<DTO_SchedulerStatistic>
    {

    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// SchedulerGetStatisticValidator Field Validator
    /// </summary>
    public class SchedulerGetStatisticValidator
        : AbstractValidator<SchedulerGetStatistic>
    {
        public SchedulerGetStatisticValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// SchedulerGetStatisticValidator Field Authorization validator
    /// </summary>
    public class SchedulerGetStatisticValidatorAuthorizationValidator
        : AuthorizationValidator<SchedulerGetStatistic>
    {
        public SchedulerGetStatisticValidatorAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SchedulerGetStatistic</c> command </summary>
    public class SchedulerGetStatisticHandler
        : IRequestHandler<SchedulerGetStatistic, DTO_SchedulerStatistic>
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
        public SchedulerGetStatisticHandler(
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
        /// Command handler for <c>SchedulerGetStatistic</c>
        /// </summary>
        public async Task<DTO_SchedulerStatistic> Handle(
            SchedulerGetStatistic request,
            CancellationToken cancellationToken
        )
        {
            try
            {
                JobList<Hangfire.Storage.Monitoring.FailedJobDto> joblist;

                IMonitoringApi monitor = JobStorage.Current.GetMonitoringApi();

                StatisticsDto statistic_dto = monitor.GetStatistics();

                DTO_SchedulerStatistic statistic_response = new DTO_SchedulerStatistic()
                {
                    Servers = statistic_dto.Servers,
                    Recurring = statistic_dto.Recurring,
                    Enqueued = statistic_dto.Enqueued,
                    Queues = statistic_dto.Queues,
                    Scheduled = statistic_dto.Scheduled,
                    Processing = statistic_dto.Processing,
                    Succeeded = statistic_dto.Succeeded,
                    Failed = statistic_dto.Failed,
                    Deleted = statistic_dto.Deleted,
                };

                return statistic_response;

            }
            catch
            {
                return new DTO_SchedulerStatistic();
            }

        }
    }
}