using MediatR;
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
    /// Query Scheduler get success Job by Id
    /// </summary>
    public class SchedulerGetSuccessJobById
        : CommandBase<DTO_SuccessJob>
    {
        public string jobid { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// SchedulerGetSuccessJobByIdValidator Field Validator
    /// </summary>
    public class SchedulerGetSuccessJobByIdValidator
        : AbstractValidator<SchedulerGetSuccessJobById?>
    {
        public SchedulerGetSuccessJobByIdValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// SchedulerGetSuccessJobByIdValidator Field Authorization validator
    /// </summary>
    public class SchedulerGetSuccessJobByIdValidatorAuthorizationValidator
        : AuthorizationValidator<SchedulerGetSuccessJobById>
    {
        public SchedulerGetSuccessJobByIdValidatorAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SchedulerGetSuccessJobById</c> command </summary>
    public class SchedulerGetSuccessJobByIdHandler
    : IRequestHandler<SchedulerGetSuccessJobById, DTO_SuccessJob>
    {
        /// <summary>
        /// Main constructor
        /// </summary>
        public SchedulerGetSuccessJobByIdHandler()
        {

        }

        /// <summary>
        /// Command handler for <c>SchedulerGetSuccessJobById</c>
        /// </summary>
        public async Task<DTO_SuccessJob> Handle(
            SchedulerGetSuccessJobById request,
            CancellationToken cancellationToken
        )
        {
            try
            {
                JobList<Hangfire.Storage.Monitoring.SucceededJobDto> joblist;

                IMonitoringApi monitor = JobStorage.Current.GetMonitoringApi();

                joblist = monitor.SucceededJobs(0, 250);

                List<GQL_SuccessJob> response = new List<GQL_SuccessJob>();

                return joblist.Where(e => e.Key == request.jobid)
                .Select(e => new DTO_SuccessJob()
                {
                    ID = e.Key,
                    Name = e.Value?.Job != null ? SchedulerHelpers.JobName(e.Value.Job) : "Unknown",
                    TotalDuration = e.Value.TotalDuration,
                    SucceededAt = e.Value.SucceededAt,
                    InSucceededState = e.Value.InSucceededState,
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