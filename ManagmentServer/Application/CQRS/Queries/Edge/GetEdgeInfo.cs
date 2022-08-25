using MediatR;
using AutoMapper;
using Persistence;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.Services;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Edge informations
    /// </summary>
    public class GetEdgeInfo : CommandBase<DTO_Edge>
    {
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetEdgeInfo Field Validator
    /// </summary>
    public class GetEdgeInfoValidator : AbstractValidator<GetEdgeInfo>
    {
        public GetEdgeInfoValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// GetEdgeInfo Field Authorization validator
    /// </summary>
    public class GetEdgeInfoAuthorizationValidator : AuthorizationValidator<GetEdgeInfo>
    {
        public GetEdgeInfoAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetEdgeInfo</c> command </summary>
    public class GetEdgeInfoHandler : IRequestHandler<GetEdgeInfo, DTO_Edge>
    {
        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current;

        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx></c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetEdgeInfoHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            ICurrentUser currentuser,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;

            _current = currentuser;
        }

        /// <summary>
        /// Command handler for <c>GetEdgeInfo</c>
        /// </summary>
        public async Task<DTO_Edge> Handle(
            GetEdgeInfo request, CancellationToken cancellationToken)
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

            return _mapper.Map<DTO_Edge>(edge);
        }
    }
}