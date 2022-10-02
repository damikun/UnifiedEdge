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
    /// Query Scheduler jobs Method Loader
    /// </summary>
    public class SchedulerJobMethodLoader
        : CommandBase<Dictionary<string, string?>>
    {
        public SchedulerJobMethodLoader(IReadOnlyList<string> keys)
        {
            Keys = keys;
        }

        public IReadOnlyList<string> Keys { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// SchedulerJobMethodLoaderValidator Field Validator
    /// </summary>
    public class SchedulerJobMethodLoaderValidator
        : AbstractValidator<SchedulerJobMethodLoader>
    {
        public SchedulerJobMethodLoaderValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// SchedulerJobMethodLoaderValidator Field Authorization validator
    /// </summary>
    public class SchedulerJobMethodLoaderValidatorAuthorizationValidator
        : AuthorizationValidator<SchedulerJobMethodLoader>
    {
        public SchedulerJobMethodLoaderValidatorAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SchedulerJobMethodLoader</c> command </summary>
    public class SchedulerJobMethodLoaderHandler
        : IRequestHandler<SchedulerJobMethodLoader, Dictionary<string, string?>>
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
        public SchedulerJobMethodLoaderHandler(
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
        /// Command handler for <c>SchedulerJobMethodLoader</c>
        /// </summary>
        public async Task<Dictionary<string, string?>> Handle(
            SchedulerJobMethodLoader request,
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

                    response.Add(id, JobMethodCallRenderer.Render(detaildto.Job).ToString());

                }
                catch { }

            }
            return response;
        }
    }
}