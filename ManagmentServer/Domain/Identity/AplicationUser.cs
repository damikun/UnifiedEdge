
using Microsoft.AspNetCore.Identity;

namespace Domain.Server
{
    public class ApplicationUser : IdentityUser
    {
        public string FavoriteColor { get; set; }
    }
}