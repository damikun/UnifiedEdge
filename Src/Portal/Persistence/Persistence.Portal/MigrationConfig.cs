using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Persistence.Portal
{
    public class ManagmentDbContext_DesignContextFactory
        : IDesignTimeDbContextFactory<ManagmentDbCtx>
    {

        public ManagmentDbCtx CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ManagmentDbCtx>();
            builder.UseSqlite("Data Source=../Persistence.Portal/managment.db");
            return new ManagmentDbCtx(builder.Options);
        }
    }
}
