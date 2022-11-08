using MediatR;
using AutoMapper;
using Persistence.Portal;
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
    /// UpdateEdgeLocation2
    /// </summary>
    [Authorize]
    public class UpdateEdgeLocation2 : CommandBase<DTO_Edge>
    {
#nullable enable
        public string? Location2;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - UpdateEdgeLocation2
    /// </summary>
    public class UpdateEdgeLocation2Validator : AbstractValidator<UpdateEdgeLocation2>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public UpdateEdgeLocation2Validator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.Location2)
            .MaximumLength(100);
        }
    }

    /// <summary>
    /// Authorization validators - UpdateEdgeLocation2
    /// </summary>
    public class UpdateEdgeLocation2AuthorizationValidator : AuthorizationValidator<UpdateEdgeLocation2>
    {
        public UpdateEdgeLocation2AuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>UpdateEdgeLocation2Handler</c> command </summary>
    public class UpdateEdgeLocation2Handler : IRequestHandler<UpdateEdgeLocation2, DTO_Edge>
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
        private readonly SemaphoreSlim _semaphore = new SemaphoreSlim(2);

        /// <summary>
        /// Main constructor
        /// </summary>
        public UpdateEdgeLocation2Handler(IDbContextFactory<ManagmentDbCtx> factory, IMapper mapper)
        {
            _factory = factory;

            _mapper = mapper;
        }

        /// <summary>
        /// Command handler for <c>UpdateEdgeLocation2</c>
        /// </summary>
        public async Task<DTO_Edge> Handle(UpdateEdgeLocation2 request, CancellationToken cancellationToken)
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

                if (edge.Location2 != request.Location2)
                    edge.Location2 = request.Location2;

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


    public class UpdateEdgeLocation2_PostProcessor
        : IRequestPostProcessor<UpdateEdgeLocation2, DTO_Edge>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public UpdateEdgeLocation2_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            UpdateEdgeLocation2 request,
            DTO_Edge response,
            CancellationToken cancellationToken)
        {
            if (response != null)
            {
                await _publisher.Publish(
                    new EdgeLocationUpdatedNotifi(response),
                    PublishStrategy.ParallelNoWait, default(CancellationToken)
                );
            }
        }
    }

}