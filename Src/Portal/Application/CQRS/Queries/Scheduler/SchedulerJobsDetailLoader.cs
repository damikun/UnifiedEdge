using MediatR;
using Hangfire;
using AutoMapper;
using Persistence.Portal;
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
    /// Query Scheduler jobs detail Loader
    /// </summary>
    public class SchedulerJobsDetailLoader
        : CommandBase<Dictionary<string, GQL_JobDetail?>>
    {
        public SchedulerJobsDetailLoader(IReadOnlyList<string> keys)
        {
            Keys = keys;
        }

        public IReadOnlyList<string> Keys { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// SchedulerJobsDetailLoaderValidator Field Validator
    /// </summary>
    public class SchedulerJobsDetailLoaderValidator
        : AbstractValidator<SchedulerJobsDetailLoader>
    {
        public SchedulerJobsDetailLoaderValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// SchedulerJobsDetailLoaderValidator Field Authorization validator
    /// </summary>
    public class SchedulerJobsDetailLoaderValidatorAuthorizationValidator
        : AuthorizationValidator<SchedulerJobsDetailLoader>
    {
        public SchedulerJobsDetailLoaderValidatorAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SchedulerJobsDetailLoader</c> command </summary>
    public class SchedulerJobsDetailLoaderHandler
        : IRequestHandler<SchedulerJobsDetailLoader, Dictionary<string, GQL_JobDetail?>>
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
        public SchedulerJobsDetailLoaderHandler(
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
        /// Command handler for <c>SchedulerJobsDetailLoader</c>
        /// </summary>
        public async Task<Dictionary<string, GQL_JobDetail?>> Handle(
            SchedulerJobsDetailLoader request,
            CancellationToken cancellationToken
        )
        {
            IMonitoringApi monitor = JobStorage.Current.GetMonitoringApi();

            Dictionary<string, GQL_JobDetail?> response = new Dictionary<string, GQL_JobDetail?>();

            foreach (var id in request.Keys)
            {
                try
                {
                    JobDetailsDto detaildto = monitor.JobDetails(id);

                    if (detaildto == null)
                    {
                        continue;
                    }

                    List<GQL_JobParameter?> detailparams = new List<GQL_JobParameter?>();

                    foreach (var item in detaildto.Properties)
                    {
                        detailparams.Add(new GQL_JobParameter()
                        {
                            Name = item.Key,
                            Value = item.Value
                        });
                    }

                    response.Add(id, new GQL_JobDetail()
                    {
                        Parametrs = detailparams,
                        JobId = id
                    });

                }
                catch
                {
                    response.Add(id, null);
                }


            }
            return response;
        }
    }
}