using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.Services;
using Persistence.Identity;
using Microsoft.AspNetCore.Http;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query user batch by ids
    /// </summary>
    public class GetUsersBatchById : CommandBase<Dictionary<string, DTO_User>>
    {
#nullable disable
        public string[] UserIds { get; set; }
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetUsersBatchById Field Validator
    /// </summary>
    public class GetUsersBatchByIdValidator
        : AbstractValidator<GetUsersBatchById>
    {
        private readonly IDbContextFactory<PortalIdentityDbContextPooled> _factory;

        public GetUsersBatchByIdValidator(
            IDbContextFactory<PortalIdentityDbContextPooled> factory
        )
        {
            _factory = factory;
        }

        public async Task<bool> Exist(
            string id,
            CancellationToken cancellationToken
        )
        {
            await using PortalIdentityDbContext dbContext =
                _factory.CreateDbContext();

            return await dbContext.Users
                .AnyAsync(e => e.Id == id, cancellationToken);
        }
    }

    /// <summary>
    /// GetUsersBatchById Field Authorization validator
    /// </summary>
    public class GetUsersBatchByIdAuthorizationValidator
        : AuthorizationValidator<GetUsersBatchById>
    {
        public GetUsersBatchByIdAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetUsersBatchById</c> command </summary>
    public class GetUsersBatchByIdHandler
        : IRequestHandler<GetUsersBatchById, Dictionary<string, DTO_User>>
    {
        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current;

        /// <summary>
        /// Injected <c>IDbContextFactory<PortalIdentityDbContextPooled></c>
        /// </summary>
        private readonly IDbContextFactory<PortalIdentityDbContextPooled> _factory;

        /// <summary>
        /// Injected <c>IHttpContextAccessor</c>
        /// </summary>
        private readonly IHttpContextAccessor _accessor;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetUsersBatchByIdHandler(
            IDbContextFactory<PortalIdentityDbContextPooled> factory,
            ICurrentUser currentuser,
            IHttpContextAccessor accessor,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;

            _accessor = accessor;

            _current = currentuser;
        }

        /// <summary>
        /// Command handler for <c>GetUsersBatchById</c>
        /// </summary>
        public async Task<Dictionary<string, DTO_User>> Handle(
            GetUsersBatchById request,
            CancellationToken cancellationToken
        )
        {
            await using PortalIdentityDbContext dbContext =
                _factory.CreateDbContext();

            return await dbContext.Users
            .TagWith("Dataloader -> UsersById")
            .AsNoTracking()
            .Where(e => request.UserIds.Contains(e.Id))
            .ToDictionaryAsync(e => e.Id, s => new DTO_User()
            {
                Id = s.Id,
                Enabled = s.Enabled,
                FirstName = s.FirstName,
                LastName = s.LastName,
                UserName = s.UserName
            },
            cancellationToken
            );
        }
    }
}