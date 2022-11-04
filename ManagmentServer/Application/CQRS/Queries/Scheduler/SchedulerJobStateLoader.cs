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
    /// Query Scheduler jobs state Loader
    /// </summary>
    public class SchedulerJobStateLoader
        : CommandBase<Dictionary<string, string?>>
    {
        public SchedulerJobStateLoader(IReadOnlyList<string> keys)
        {
            Keys = keys;
        }

        public IReadOnlyList<string> Keys { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// SchedulerJobStateLoaderValidator Field Validator
    /// </summary>
    public class SchedulerJobStateLoaderValidator
        : AbstractValidator<SchedulerJobStateLoader>
    {
        public SchedulerJobStateLoaderValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// SchedulerJobStateLoaderValidator Field Authorization validator
    /// </summary>
    public class SchedulerJobStateLoaderValidatorAuthorizationValidator
        : AuthorizationValidator<SchedulerJobStateLoader>
    {
        public SchedulerJobStateLoaderValidatorAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SchedulerJobStateLoader</c> command </summary>
    public class SchedulerJobStateLoaderHandler
        : IRequestHandler<SchedulerJobStateLoader, Dictionary<string, string?>>
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
        public SchedulerJobStateLoaderHandler(
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
        /// Command handler for <c>SchedulerJobStateLoader</c>
        /// </summary>
        public async Task<Dictionary<string, string?>> Handle(
            SchedulerJobStateLoader request,
            CancellationToken cancellationToken
        )
        {
            IMonitoringApi monitor = JobStorage.Current.GetMonitoringApi();

            Dictionary<string, string?> response = new Dictionary<string, string?>();

            foreach (var id in request.Keys)
            {
                try
                {
                    JobDetailsDto detaildto = monitor.JobDetails(id);

                    if (detaildto == null ||
                        detaildto.History == null ||
                        detaildto.History.Count == 0)
                    {
                        continue;
                    }

                    response.Add(id, detaildto.History[0].StateName);

                }
                catch { }

            }
            return response;
        }
    }
}