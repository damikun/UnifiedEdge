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
    /// UpdateEdgeLocation1
    /// </summary>
    // [Authorize]
    public class UpdateEdgeLocation1 : CommandBase<DTO_Edge>
    {
#nullable enable
        public string? Location1;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - UpdateEdgeLocation1
    /// </summary>
    public class UpdateEdgeLocation1Validator : AbstractValidator<UpdateEdgeLocation1>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public UpdateEdgeLocation1Validator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.Location1);
        }
    }

    /// <summary>
    /// Authorization validators - UpdateEdgeLocation1
    /// </summary>
    public class UpdateEdgeLocation1AuthorizationValidator : AuthorizationValidator<UpdateEdgeLocation1>
    {
        public UpdateEdgeLocation1AuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>UpdateEdgeLocation1Handler</c> command </summary>
    public class UpdateEdgeLocation1Handler : IRequestHandler<UpdateEdgeLocation1, DTO_Edge>
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
        public UpdateEdgeLocation1Handler(IDbContextFactory<ManagmentDbCtx> factory, IMapper mapper)
        {
            _factory = factory;

            _mapper = mapper;
        }

        /// <summary>
        /// Command handler for <c>UpdateEdgeLocation1</c>
        /// </summary>
        public async Task<DTO_Edge> Handle(UpdateEdgeLocation1 request, CancellationToken cancellationToken)
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


    public class UpdateEdgeLocation1_PostProcessor
        : IRequestPostProcessor<UpdateEdgeLocation1, DTO_Edge>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public UpdateEdgeLocation1_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            UpdateEdgeLocation1 request,
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