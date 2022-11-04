using MediatR;
using AutoMapper;
using Persistence.Portal;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Edge default adapter
    /// </summary>
    public class GetDefaultAdapter : CommandBase<DTO_Adapter?>
    {
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetDefaultAdapter Field Validator
    /// </summary>
    public class GetDefaultAdapterValidator : AbstractValidator<GetDefaultAdapter>
    {
        public GetDefaultAdapterValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// GetDefaultAdapter Field Authorization validator
    /// </summary>
    public class GetDefaultAdapterAuthorizationValidator : AuthorizationValidator<GetDefaultAdapter>
    {
        public GetDefaultAdapterAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetDefaultAdapter</c> command </summary>
    public class GetDefaultAdapterHandler : IRequestHandler<GetDefaultAdapter, DTO_Adapter?>
    {

        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx></c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IEndpointProvider</c>
        /// </summary>
        private readonly IEndpointProvider _endpoint_provider;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetDefaultAdapterHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            IEndpointProvider endpoint_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _endpoint_provider = endpoint_provider;
        }

        /// <summary>
        /// Command handler for <c>GetDefaultAdapter</c>
        /// </summary>
        public async Task<DTO_Adapter?> Handle(
            GetDefaultAdapter request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var edge = await dbContext.Edge
                .AsNoTracking()
                .Where(e => e.Id == 1)
                .FirstOrDefaultAsync();

            if (edge == null)
            {
                throw new Exception("Please make sure DB migrations was applied. Edges record not found");
            }

            if (string.IsNullOrWhiteSpace(edge.DefaultAdapterId))
            {
                var default_adapter = _endpoint_provider.GetDefaultAdapter();

                if (default_adapter != null)
                {
                    return _mapper.Map<DTO_Adapter?>(default_adapter);
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return _mapper.Map<DTO_Adapter?>(
                    _endpoint_provider.GetAdapterById(edge.DefaultAdapterId)
                );
            }
        }
    }
}