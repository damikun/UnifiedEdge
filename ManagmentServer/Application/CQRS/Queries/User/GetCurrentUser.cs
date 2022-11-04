using MediatR;
using AutoMapper;
using Persistence;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.Services;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Current User
    /// </summary>
    public class GetCurrentUser : CommandBase<DTO_User?>
    {
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetCurrentUser Field Validator
    /// </summary>
    public class GetCurrentUserValidator
        : AbstractValidator<GetCurrentUser>
    {
        public GetCurrentUserValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// GetCurrentUser Field Authorization validator
    /// </summary>
    public class GetCurrentUserAuthorizationValidator
        : AuthorizationValidator<GetCurrentUser>
    {
        public GetCurrentUserAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetCurrentUser</c> command </summary>
    public class GetCurrentUserHandler : IRequestHandler<GetCurrentUser, DTO_User?>
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
        public GetCurrentUserHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
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
        /// Command handler for <c>GetCurrentUser</c>
        /// </summary>
        public async Task<DTO_User?> Handle(
            GetCurrentUser request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            if (_accessor == null || _accessor.HttpContext == null)
            {
                return null;
            }

            var result = await _accessor.HttpContext.AuthenticateAsync();

            if (!result.Succeeded)
            {
                return null;
            }

            //PrintClaimsToConsole(result.Principal.Claims);

            return new DTO_User()
            {
                Id = result.Principal.GetId<string>(),
                Name = result.Principal.GetFullName(),
                FirstName = result.Principal.FirstName(),
                LastName = result.Principal.LastName(),
            };
        }

        private static void PrintClaimsToConsole(IEnumerable<Claim> claims)
        {
            foreach (var item in claims)
            {
                System.Console.WriteLine($"{item.Type} -> {item.Value} -> {item.ValueType}");
            }
        }
    }
}