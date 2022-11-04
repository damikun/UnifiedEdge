
using Microsoft.AspNetCore.Identity;

namespace Domain.Server
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }
    }
}