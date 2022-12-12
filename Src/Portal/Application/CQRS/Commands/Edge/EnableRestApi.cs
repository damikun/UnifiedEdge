using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Portal;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// EnableRestApi
    /// </summary>
    [Authorize]
    public class EnableRestApi : CommandBase<DTO_Edge>
    {
        public bool Enable { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - EnableRestApi
    /// </summary>
    public class EnableRestApiValidator
        : AbstractValidator<EnableRestApi>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public EnableRestApiValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;
        }
    }

    /// <summary>
    /// Authorization validators - EnableRestApi
    /// </summary>
    public class EnableRestApiAuthorizationValidator
        : AuthorizationValidator<EnableRestApi>
    {
        public EnableRestApiAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>EnableRestApiHandler</c> command </summary>
    public class EnableRestApiHandler
        : IRequestHandler<EnableRestApi, DTO_Edge>
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
        public EnableRestApiHandler(IDbContextFactory<ManagmentDbCtx> factory, IMapper mapper)
        {
            _factory = factory;

            _mapper = mapper;
        }

        /// <summary>
        /// Command handler for <c>EnableRestApi</c>
        /// </summary>
        public async Task<DTO_Edge> Handle(EnableRestApi request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            await _semaphore.WaitAsync();

            try
            {
                var edge = await dbContext.Edge
                    .FirstOrDefaultAsync(cancellationToken);

                if (edge == null)
                {
                    throw new Exception("Please make sure DB migrations was applied. Edges record not found");
                }

                edge.ApiRest = request.Enable;

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


    public class EnableRestApi_PostProcessor
        : IRequestPostProcessor<EnableRestApi, DTO_Edge>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public EnableRestApi_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            EnableRestApi request,
            DTO_Edge response,
            CancellationToken cancellationToken)
        {
            if (response != null)
            {
                // Notify
            }
        }
    }

}