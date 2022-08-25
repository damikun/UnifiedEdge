using MediatR;
using AutoMapper;
using Persistence;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Aplication.Services;
using Aplication.Events.EdgeCfg;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// UpdateEdgeDescription
    /// </summary>
    // [Authorize]
    public class UpdateEdgeDescription : CommandBase<DTO_Edge>
    {
#nullable disable
        public string Description;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - UpdateEdgeDescription
    /// </summary>
    public class UpdateEdgeDescriptionValidator : AbstractValidator<UpdateEdgeDescription>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public UpdateEdgeDescriptionValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.Description);
        }
    }

    /// <summary>
    /// Authorization validators - UpdateEdgeDescription
    /// </summary>
    public class UpdateEdgeDescriptionAuthorizationValidator : AuthorizationValidator<UpdateEdgeDescription>
    {
        public UpdateEdgeDescriptionAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>UpdateEdgeDescriptionHandler</c> command </summary>
    public class UpdateEdgeDescriptionHandler : IRequestHandler<UpdateEdgeDescription, DTO_Edge>
    {

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Concurrent lock
        /// </summary>
        private readonly SemaphoreSlim _semaphore = new SemaphoreSlim(1);

        /// <summary>
        /// Main constructor
        /// </summary>
        public UpdateEdgeDescriptionHandler(IDbContextFactory<ManagmentDbCtx> factory, IMapper mapper)
        {
            _factory = factory;

            _mapper = mapper;
        }

        /// <summary>
        /// Command handler for <c>UpdateEdgeDescription</c>
        /// </summary>
        public async Task<DTO_Edge> Handle(UpdateEdgeDescription request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            await _semaphore.WaitAsync();

            try
            {
                var edge = await dbContext.Edge.FirstOrDefaultAsync(cancellationToken);

                if (edge == null)
                {
                    throw new Exception("Please make sure DB migrations was applied. Edges record not found");
                }

                edge.Description = request.Description;

                dbContext.Update(edge);

                await dbContext.SaveChangesAsync(cancellationToken);

                return _mapper.Map<DTO_Edge>(edge);
            }
            finally
            {
                _semaphore.Release();
            }

        }

    }

    //---------------------------------------
    //---------------------------------------


    public class UpdateEdgeDescription_PostProcessor
        : IRequestPostProcessor<UpdateEdgeDescription, DTO_Edge>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public UpdateEdgeDescription_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            UpdateEdgeDescription request,
            DTO_Edge response,
            CancellationToken cancellationToken)
        {
            if (response != null)
            {
                await _publisher.Publish(
                    new EdgeDescriptionUpdatedNotifi(response),
                    PublishStrategy.ParallelNoWait, default(CancellationToken)
                );
            }
        }
    }

}