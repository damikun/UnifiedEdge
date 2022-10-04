using MediatR;
using Hangfire;
using Aplication.Core;
using Hangfire.Storage;
using FluentValidation;
using System.Reflection;
using Aplication.DTO.Scheduler;
using Aplication.CQRS.Behaviours;

namespace Aplication.CQRS.Queries.Scheduler
{

    /// <summary>
    /// Query Scheduler getJob by Id
    /// </summary>
    public class SchedulerGetRecurringJobById
        : CommandBase<DTO_RecurringJob>
    {
        public string jobid { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// SchedulerGetRecurringJobByIdValidator Field Validator
    /// </summary>
    public class SchedulerGetRecurringJobByIdValidator
        : AbstractValidator<SchedulerGetRecurringJobById>
    {
        public SchedulerGetRecurringJobByIdValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// SchedulerGetRecurringJobByIdValidator Field Authorization validator
    /// </summary>
    public class SchedulerGetRecurringJobByIdValidatorAuthorizationValidator
        : AuthorizationValidator<SchedulerGetRecurringJobById>
    {
        public SchedulerGetRecurringJobByIdValidatorAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SchedulerGetRecurringJobById</c> command </summary>
    public class SchedulerGetRecurringJobByIdHandler
        : IRequestHandler<SchedulerGetRecurringJobById, DTO_RecurringJob>
    {
        /// <summary>
        /// Main constructor
        /// </summary>
        public SchedulerGetRecurringJobByIdHandler()
        {

        }

        /// <summary>
        /// Command handler for <c>SchedulerGetRecurringJobById</c>
        /// </summary>
        public async Task<DTO_RecurringJob> Handle(
            SchedulerGetRecurringJobById request,
            CancellationToken cancellationToken
        )
        {
            if (request == null || string.IsNullOrWhiteSpace(request.jobid))
            {
                return null;
            }

            using (var connection = JobStorage.Current.GetConnection())
            {
                List<RecurringJobDto> RecurringJobs = connection.GetRecurringJobs(new[] { request.jobid });

                if (RecurringJobs != null)
                {
                    return RecurringJobs.Select(e => new DTO_RecurringJob()
                    {
                        ID = e.Id,
                        Cron = e.Cron,
                        CallName = SchedulerHelpers.JobName(e.Job) ?? "Unknown",
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
                    }).FirstOrDefault()!;

                }
                else
                {
                    return null;
                }
            }
        }
    }
}