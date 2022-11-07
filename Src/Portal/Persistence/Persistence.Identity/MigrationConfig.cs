using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Identity
{
    public class ManagmentDbContext_DesignContextFactory : IDesignTimeDbContextFactory<PortalIdentityDbContext>
    {

        public PortalIdentityDbContext CreateDbContext(string[] args)
        {

            DbContextOptionsBuilder<PortalIdentityDbContext> builder =
                new DbContextOptionsBuilder<PortalIdentityDbContext>();

            builder.UseSqlite("Data Source=../Persistence.Identity/identity.db");
            return new PortalIdentityDbContext(builder.Options);
        }
    }
}
