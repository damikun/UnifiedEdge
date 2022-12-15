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
    /// EnableGraphqlApi
    /// </summary>
    [Authorize]
    public class EnableGraphqlApi : CommandBase<DTO_Edge>
    {
        public bool Enable { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - EnableGraphqlApi
    /// </summary>
    public class EnableGraphqlApiValidator
        : AbstractValidator<EnableGraphqlApi>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public EnableGraphqlApiValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;
        }
    }

    /// <summary>
    /// Authorization validators - EnableGraphqlApi
    /// </summary>
    public class EnableGraphqlApiAuthorizationValidator
        : AuthorizationValidator<EnableGraphqlApi>
    {
        public EnableGraphqlApiAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>EnableGraphqlApiHandler</c> command </summary>
    public class EnableGraphqlApiHandler
        : IRequestHandler<EnableGraphqlApi, DTO_Edge>
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
        public EnableGraphqlApiHandler(IDbContextFactory<ManagmentDbCtx> factory, IMapper mapper)
        {
            _factory = factory;

            _mapper = mapper;
        }

        /// <summary>
        /// Command handler for <c>EnableGraphqlApi</c>
        /// </summary>
        public async Task<DTO_Edge> Handle(EnableGraphqlApi request, CancellationToken cancellationToken)
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

                edge.ApiGraphql = request.Enable;

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


    public class EnableGraphqlApi_PostProcessor
        : IRequestPostProcessor<EnableGraphqlApi, DTO_Edge>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public EnableGraphqlApi_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            EnableGraphqlApi request,
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