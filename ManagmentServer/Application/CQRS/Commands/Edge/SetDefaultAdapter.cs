using MediatR;
using AutoMapper;
using Persistence.Portal;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// SetDefaultAdapter
    /// </summary>
    // [Authorize]
    public class SetDefaultAdapter : CommandBase<DTO_Adapter>
    {
#nullable disable
        public string adapter_id;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - SetDefaultAdapter
    /// </summary>
    public class SetDefaultAdapterValidator : AbstractValidator<SetDefaultAdapter>
    {
        private readonly IEndpointProvider _provider;

        public SetDefaultAdapterValidator(IEndpointProvider provider)
        {
            _provider = provider;

            RuleFor(e => e.adapter_id)
            .NotEmpty()
            .NotNull()
            .Must(Exist).WithMessage("Adapter not found");
        }

        public bool Exist(string adapter_id)
        {
            return _provider.Any(adapter_id);
        }
    }

    /// <summary>
    /// Authorization validators - SetDefaultAdapter
    /// </summary>
    public class SetDefaultAdapterAuthorizationValidator : AuthorizationValidator<SetDefaultAdapter>
    {
        public SetDefaultAdapterAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SetDefaultAdapterHandler</c> command </summary>
    public class SetDefaultAdapterHandler : IRequestHandler<SetDefaultAdapter, DTO_Adapter>
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
        /// Injected <c>IEndpointProvider</c>
        /// </summary>
        private readonly IEndpointProvider _provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public SetDefaultAdapterHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            IEndpointProvider provider)
        {
            _factory = factory;

            _mapper = mapper;

            _provider = provider;
        }

        /// <summary>
        /// Command handler for <c>SetDefaultAdapter</c>
        /// </summary>
        public async Task<DTO_Adapter> Handle(SetDefaultAdapter request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var edge = await dbContext.Edge.FirstOrDefaultAsync(cancellationToken);

            if (edge == null)
            {
                throw new Exception("Please make sure DB migrations was applied. Edges record not found");
            }

            var adapter = _provider.GetAdapterById(request.adapter_id);

            edge.DefaultAdapterId = request.adapter_id;

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_Adapter>(adapter);
        }

    }

    //---------------------------------------
    //---------------------------------------


    public class SetDefaultAdapter_PostProcessor
        : IRequestPostProcessor<SetDefaultAdapter, DTO_Adapter>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public SetDefaultAdapter_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher)
        {
            _publisher = publisher;
        }

        public async Task Process(
            SetDefaultAdapter request,
            DTO_Adapter response,
            CancellationToken cancellationToken)
        {
            if (response != null)
            {
                // await _publisher.Publish(
                //     new EdgeDefaultAdapterUpdated(response),
                //     PublishStrategy.ParallelNoWait, default(CancellationToken)
                // );
            }
        }
    }

}