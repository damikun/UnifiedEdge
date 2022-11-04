using System.ComponentModel;
using System.Security.Claims;

namespace Aplication
{

    public static partial class Extensions
    {
        private static void Validate(ClaimsPrincipal principal)
        {
            if (principal == null || principal.Identity == null)
            {
                throw new ArgumentNullException(nameof(principal));
            }

            if (!principal.Identity.IsAuthenticated)
            {
                throw new UnauthorizedAccessException(nameof(principal));
            }
        }

        public static string GetFullName(this ClaimsPrincipal principal)
        {
            Validate(principal);

            return principal.FindFirstValue("name");
        }

        public static string FirstName(this ClaimsPrincipal principal)
        {
            Validate(principal);

            return principal.FindFirstValue("given_name");
        }

        public static string LastName(this ClaimsPrincipal principal)
        {
            Validate(principal);

            return principal.FindFirstValue("family_name");
        }

        public static string Uid(this ClaimsPrincipal principal)
        {
            Validate(principal);

            return principal.FindFirstValue("sub");
        }

        public static TId GetId<TId>(this ClaimsPrincipal principal)
        {
            Validate(principal);

            var loggedInUserId = principal.FindFirstValue(ClaimTypes.NameIdentifier);

            if (typeof(TId) == typeof(string) ||
                typeof(TId) == typeof(int) ||
                typeof(TId) == typeof(long) ||
                typeof(TId) == typeof(Guid))
            {
                var converter = TypeDescriptor.GetConverter(typeof(TId));

                return (TId)converter.ConvertFromInvariantString(loggedInUserId);
            }

            throw new InvalidOperationException("The user id type is invalid");
        }

        public static Guid GetId(this ClaimsPrincipal principal)
        {
            return principal.GetId<Guid>();
        }

    }
}
