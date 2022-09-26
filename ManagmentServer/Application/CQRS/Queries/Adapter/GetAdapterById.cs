using MediatR;
using AutoMapper;
using Persistence;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;

namespace Aplication.CQRS.Queries
{
    /// <summary>
    /// Query adapter by ID
    /// </summary>
    public class GetAdapterById
        : CommandBase<DTO_Adapter>
    {
#nullable disable
        public string ID { get; set; }
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetAdapterById Field Validator
    /// </summary>
    public class GetAdapterByIdValidator
        : AbstractValidator<GetAdapterById>
    {
        private readonly IEndpointProvider _endpoint_provider;

        public GetAdapterByIdValidator(
            IEndpointProvider endpoint_provider
        )
        {
            _endpoint_provider = endpoint_provider;

            RuleFor(e => e.ID)
            .NotEmpty()
            .NotNull()
            .Must(Exist).WithMessage("Adapter not found");
        }

        public bool Exist(string Id)
        {
            return _endpoint_provider
                .NetworkAdapters
                .Any(e => e.Id == Id);
        }
    }

    /// <summary>
    /// GetAdapterById Field Authorization validator
    /// </summary>
    public class GetAdapterByIdAuthorizationValidator
        : AuthorizationValidator<GetAdapterById>
    {
        public GetAdapterByIdAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetAdapterById</c> command </summary>
    public class GetAdapterByIdHandler
        : IRequestHandler<GetAdapterById, DTO_Adapter>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx></c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>IEndpointProvider</c>
        /// </summary>
        private readonly IEndpointProvider _endpoint;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetAdapterByIdHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IEndpointProvider endpoint,
            IMapper mapper
        )
        {
            _factory = factory;

            _mapper = mapper;

            _endpoint = endpoint;
        }

        /// <summary>
        /// Command handler for <c>GetAdapterById</c>
        /// </summary>
        public Task<DTO_Adapter> Handle(
            GetAdapterById request,
            CancellationToken cancellationToken
        )
        {
            var adapter = _endpoint.NetworkAdapters
            .Where(e => e.Id == request.ID)
            .FirstOrDefault();

            return Task.FromResult(
                _mapper.Map<DTO_Adapter>(adapter)
            );
        }
    }
}