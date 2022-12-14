using AutoMapper;
using Aplication.DTO;
using Persistence.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Aplication.Services
{

    /// <summary>DI object of current user ID Resolver</summary>
    public class CurrentUser : ICurrentUser
    {

        /// <summary>DI object of IMapper</summary>
        private readonly IMapper _mapper;

        /// <summary>DI object of ILogger</summary>
        private readonly ILogger<CurrentUser> _logger;

        /// <summary>DI object of IHttpContextAccessor</summary>
        private readonly IHttpContextAccessor _contextAccessor;

        /// <summary>DI object of IAuthorizationService</summary>
        private readonly IAuthorizationService _authService;

        /// <summary>DI object of IDbContextFactory</summary>
        private readonly IDbContextFactory<PortalIdentityDbContextPooled> _factory;


        /// <summary>
        /// Main constructor of CurrentUserProvider
        /// </summary>
        public CurrentUser(
            IMapper mapper,
            ILogger<CurrentUser> logger,
            IHttpContextAccessor contextAccessor,
            IAuthorizationService authService,
            IDbContextFactory<PortalIdentityDbContextPooled> factory
        )
        {
            _mapper = mapper;

            _logger = logger;

            _factory = factory;

            _authService = authService;

            _contextAccessor = contextAccessor;
        }

        public string JwtToken
        {
            get
            {
                return _contextAccessor.HttpContext?.Request?.Headers["Authorization"];
            }
        }

        public bool Exist
        {
            get
            {
                return UserId != null ? true : false;
            }
        }

#nullable enable
        public string? UserId
        {

            get
            {

                try
                {
                    return _contextAccessor?.HttpContext?.User?.GetId();
                }
                catch
                {
                    return null;
                }
            }
        }
#nullable disable

#nullable enable
        public ClaimsIdentity? Claims
        {

            get
            {

                try
                {
                    return _contextAccessor?.HttpContext?.User?.Identity as ClaimsIdentity;
                }
                catch
                {
                    return null;
                }
            }
        }
#nullable disable

        public string Name
        {
            get
            {

                if (_contextAccessor?.HttpContext?.User?.Identity != null)
                {
                    return _contextAccessor?.HttpContext?.User?.Identity?.Name;
                }

                return null;
            }
        }

        /// <summary>
        /// Check user to specific role
        /// </summary>
        /// <param name="role_name"></param>
        /// <returns></returns>
        public bool HasRole(string role_name)
        {

            if (string.IsNullOrWhiteSpace(role_name))
            {
                return false;
            }

            return TestRole(_contextAccessor, role_name);
        }

        /// <summary>
        /// Check user to specific policy
        /// </summary>
        /// <param name="role_name"></param>
        /// <returns></returns>
        public async Task<bool> ValidatePolicy(string policy_name)
        {

            if (string.IsNullOrWhiteSpace(policy_name))
            {
                return false;
            }

            var result = await TestPolicy(_contextAccessor, _authService, policy_name);

            if (result is null || !result.Succeeded)
            {
                return false;
            }

            return true;
        }

#nullable enable
        public async Task<DTO_User?> GetUser(CancellationToken ct = default)
        {
            await using PortalIdentityDbContext dbContext =
            _factory.CreateDbContext();

            var user_id = UserId;

            if (user_id == null)
            {
                return null;
            }

            try
            {
                var user = await dbContext.Users
                .Where(e => e.Id == user_id)
                .FirstOrDefaultAsync(ct);

                if (user == null)
                {
                    return null;
                }

                return _mapper.Map<DTO_User>(user);
            }
            catch
            {
                return null;
            }
        }
#nullable disable

        public string GetClaim(string type)
        {
            try
            {
                return _contextAccessor?.HttpContext?.User?.Claims
                .Where(e => e.Type == type)
                .Select(e => e.Value)
                .SingleOrDefault();
            }
            catch
            {
                return null;
            }
        }

        public static bool TestRole(IHttpContextAccessor context, string role)
        {

            if (context?.HttpContext?.User != null && context.HttpContext.User.HasClaim(ClaimTypes.Role, role))
            {
                return true;
            }

            return false;
        }

#nullable enable
        public static Task<AuthorizationResult?> TestPolicy(IHttpContextAccessor context, IAuthorizationService auth, string policy)
        {

            if (context?.HttpContext?.User == null)
            {
                return Task.FromResult<AuthorizationResult?>(null);
            }
            else
            {
                return auth.AuthorizeAsync(context.HttpContext.User, "dsdpolicysd")!;
            }
        }

#nullable disable

        public bool IsAuthenticated
        {
            get
            {
                var isAuthenticated = _contextAccessor.HttpContext?.User?.Identities?.FirstOrDefault()?.IsAuthenticated;

                if (!isAuthenticated.HasValue)
                    return false;

                return isAuthenticated.Value;
            }
        }

    }
}
