using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Portal;
using Aplication.Services;
using Aplication.Events.EdgeCfg;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// UpdateEdgeName
    /// </summary>
    [Authorize]
    public class UpdateEdgeName : CommandBase<DTO_Edge>
    {
#nullable disable
        public string Name;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - UpdateEdgeName
    /// </summary>
    public class UpdateEdgeNameValidator : AbstractValidator<UpdateEdgeName>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public UpdateEdgeNameValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.Name)
            .NotEmpty()
            .NotNull()
            .MinimumLength(3)
            .MaximumLength(20);
        }
    }

    /// <summary>
    /// Authorization validators - UpdateEdgeName
    /// </summary>
    public class UpdateEdgeNameAuthorizationValidator : AuthorizationValidator<UpdateEdgeName>
    {
        public UpdateEdgeNameAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>UpdateEdgeNameHandler</c> command </summary>
    public class UpdateEdgeNameHandler : IRequestHandler<UpdateEdgeName, DTO_Edge>
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
        public UpdateEdgeNameHandler(IDbContextFactory<ManagmentDbCtx> factory, IMapper mapper)
        {
            _factory = factory;

            _mapper = mapper;
        }

        /// <summary>
        /// Command handler for <c>UpdateEdgeName</c>
        /// </summary>
        public async Task<DTO_Edge> Handle(UpdateEdgeName request, CancellationToken cancellationToken)
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

                edge.Name = request.Name;

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


    public class UpdateEdgeName_PostProcessor
        : IRequestPostProcessor<UpdateEdgeName, DTO_Edge>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public UpdateEdgeName_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            UpdateEdgeName request,
            DTO_Edge response,
            CancellationToken cancellationToken)
        {
            if (response != null)
            {
                await _publisher.Publish(
                    new EdgeNameUpdatedNotifi(response),
                    PublishStrategy.ParallelNoWait, default(CancellationToken)
                );
            }
        }
    }

}