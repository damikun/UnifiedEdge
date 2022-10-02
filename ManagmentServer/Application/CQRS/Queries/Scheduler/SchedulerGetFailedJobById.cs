using Hangfire;
using Aplication.Core;
using Hangfire.Storage;
using FluentValidation;
using Aplication.DTO.Scheduler;
using Aplication.CQRS.Behaviours;
using Hangfire.Storage.Monitoring;

namespace Aplication.CQRS.Queries.Scheduler
{

    /// <summary>
    /// Query Scheduler get Failed Job by Id
    /// </summary>
    public class SchedulerGetFailedJobById
        : CommandBase<DTO_FailedJob?>
    {
        public string jobid { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// SchedulerGetFailedJobByIdValidator Field Validator
    /// </summary>
    public class SchedulerGetFailedJobByIdValidator
        : AbstractValidator<SchedulerGetFailedJobById?>
    {
        public SchedulerGetFailedJobByIdValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// SchedulerGetFailedJobByIdValidator Field Authorization validator
    /// </summary>
    public class SchedulerGetFailedJobByIdValidatorAuthorizationValidator
        : AuthorizationValidator<SchedulerGetFailedJobById>
    {
        public SchedulerGetFailedJobByIdValidatorAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SchedulerGetFailedJobById</c> command </summary>
    public class SchedulerGetFailedJobByIdHandler
    // : IRequestHandler<SchedulerGetFailedJobById, DTO_FailedJob>
    {
        /// <summary>
        /// Main constructor
        /// </summary>
        public SchedulerGetFailedJobByIdHandler()
        {

        }

        /// <summary>
        /// Command handler for <c>SchedulerGetFailedJobById</c>
        /// </summary>
        public async Task<DTO_FailedJob?> Handle(
            SchedulerGetFailedJobById request,
            CancellationToken cancellationToken
        )
        {
            try
            {
                JobList<Hangfire.Storage.Monitoring.FailedJobDto> joblist;

                IMonitoringApi monitor = JobStorage.Current.GetMonitoringApi();

                joblist = monitor.FailedJobs(0, 250);

                List<GQL_FailedJob> response = new List<GQL_FailedJob>();

                return joblist.Where(e => e.Key == request.jobid)
                .Select(item => new DTO_FailedJob()
                {
                    ID = item.Key,
                    Reason = item.Value.Reason,
                    FailedAt = item.Value.FailedAt,
                    ExceptionType = item.Value.ExceptionType,
                    ExceptionMessage = item.Value.ExceptionMessage,
                    ExceptionDetails = item.Value.ExceptionDetails,
                    InFailedState = item.Value.InFailedState
                })
                .FirstOrDefault();
            }
            catch
            {
                return null;
            }
        }
    }
}