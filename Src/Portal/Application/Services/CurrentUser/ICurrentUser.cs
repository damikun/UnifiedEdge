using System.Security.Claims;
using Aplication.DTO;

namespace Aplication.Services
{

    /// <summary>
    /// Current user provider
    /// </summary>
    public interface ICurrentUser
    {

        /// <summary>
        /// Returns true if user exist in context
        /// </summary>
        bool Exist { get; }
#nullable enable
        /// <summary>
        /// Returns curren user system Id
        /// </summary>
        string? UserId { get; }
#nullable disable
        /// <summary>
        /// Returns user name
        /// </summary>
        string Name { get; }

        /// <summary>
        /// Returns current api access token or null
        /// </summary>
        string JwtToken { get; }

#nullable enable
        /// <summary>
        /// Returns user claims
        /// </summary>
        ClaimsIdentity? Claims { get; }
#nullable disable

        /// <summary>
        /// Get specific claim value
        /// </summary>
        string GetClaim(string type);

        /// <summary>
        /// Test user regarding to specific role
        /// </summary>
        /// <param name="role_name"></param>
        /// <returns>True if user is has specific role</returns>
        bool HasRole(string role_name);

#nullable enable
        /// <summary>
        /// Return User object DTO for current user
        /// </summary>
        /// <param name="role_name"></param>
        /// <returns>DTO_User</returns>
        Task<DTO_User?> GetUser(CancellationToken ct = default);
#nullable disable

        /// <summary>
        /// Returns API authentication state
        /// </summary>
        public bool IsAuthenticated { get; }

    }

}