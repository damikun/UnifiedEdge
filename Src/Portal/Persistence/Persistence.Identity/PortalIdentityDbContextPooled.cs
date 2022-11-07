
using Microsoft.EntityFrameworkCore;

namespace Persistence.Identity
{

    public class PortalIdentityDbContextPooled : PortalIdentityDbContext
    {
        public PortalIdentityDbContextPooled(DbContextOptions<PortalIdentityDbContextPooled> options)
            : base(options)
        {
        }

    }

}