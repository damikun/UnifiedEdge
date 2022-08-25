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
    /// UpdateEdgeLocation
    /// </summary>
    // [Authorize]
    public class UpdateEdgeLocation : CommandBase<DTO_Edge>
    {
#nullable enable
        public string? Location1;

        public string? Location2;

        public string? Location3;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - UpdateEdgeLocation
    /// </summary>
    public class UpdateEdgeLocationValidator : AbstractValidator<UpdateEdgeLocation>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public UpdateEdgeLocationValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.Location1);

            RuleFor(e => e.Location2);

            RuleFor(e => e.Location3);
        }
    }

    /// <summary>
    /// Authorization validators - UpdateEdgeLocation
    /// </summary>
    public class UpdateEdgeLocationAuthorizationValidator : AuthorizationValidator<UpdateEdgeLocation>
    {
        public UpdateEdgeLocationAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>UpdateEdgeLocationHandler</c> command </summary>
    public class UpdateEdgeLocationHandler : IRequestHandler<UpdateEdgeLocation, DTO_Edge>
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
        public UpdateEdgeLocationHandler(IDbContextFactory<ManagmentDbCtx> factory, IMapper mapper)
        {
            _factory = factory;

            _mapper = mapper;
        }

        /// <summary>
        /// Command handler for <c>UpdateEdgeLocation</c>
        /// </summary>
        public async Task<DTO_Edge> Handle(UpdateEdgeLocation request, CancellationToken cancellationToken)
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

                if (edge.Location1 != request.Location1)
                    edge.Location1 = request.Location1;
                if (edge.Location2 != request.Location2)
                    edge.Location2 = request.Location2;
                if (edge.Location3 != request.Location3)
                    edge.Location3 = request.Location3;

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


    public class UpdateEdgeLocation_PostProcessor
        : IRequestPostProcessor<UpdateEdgeLocation, DTO_Edge>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public UpdateEdgeLocation_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            UpdateEdgeLocation request,
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