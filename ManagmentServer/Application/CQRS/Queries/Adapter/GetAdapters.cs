using MediatR;
using AutoMapper;
using Persistence;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.Interfaces;
using Aplication.Core.Pagination;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;
using Aplication.Services.ServerFascade;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query all adapters
    /// </summary>
    public class GetAdapters
        : CommandBase<DTO_Connection<DTO_Adapter>>
    {
        public GetAdapters(CursorArguments arguments)
        {
            Arguments = arguments;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetAdapters Field Validator
    /// </summary>
    public class GetAdaptersValidator
        : AbstractValidator<GetAdapters>
    {
        public GetAdaptersValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// GetAdapters Field Authorization validator
    /// </summary>
    public class GetAdaptersAuthorizationValidator
        : AuthorizationValidator<GetAdapters>
    {
        public GetAdaptersAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetAdapters</c> command </summary>
    public class GetAdaptersHandler
        : IRequestHandler<GetAdapters, DTO_Connection<DTO_Adapter>>
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
        /// Injected <c>ICursorPagination</c>
        /// </summary>
        private readonly ICursorPagination<DTO_Adapter> _cursor_provider;


        /// <summary>
        /// Main constructor
        /// </summary>
        public GetAdaptersHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IEndpointProvider endpoint,
            IMapper mapper,
            ICursorPagination<DTO_Adapter> cursor_provider
        )
        {
            _factory = factory;

            _mapper = mapper;

            _endpoint = endpoint;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetAdapters</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_Adapter>> Handle(
            GetAdapters request, CancellationToken cancellationToken)
        {
            var adapters = _endpoint.NetworkAdapters.ToList();

            if (adapters == null)
            {
                adapters = new List<NetworkInterface>();
            }

            var mapped = _mapper.Map<List<DTO_Adapter>>(adapters);

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                mapped.AsQueryable(),
                request.Arguments,
                (ct) => Task.FromResult(mapped.Count),
                cancellationToken
            );

            return new DTO_Connection<DTO_Adapter>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}