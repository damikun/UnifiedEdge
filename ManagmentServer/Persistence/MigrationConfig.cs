using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Persistence
{
    public class ManagmentDbContext_DesignContextFactory : IDesignTimeDbContextFactory<ManagmentDbCtx>
    {

        public ManagmentDbCtx CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ManagmentDbCtx>();
            // builder.UseNpgsql("Host=localhost;Port=5555;Database=APIServer;Username=postgres;Password=postgres");
            builder.UseSqlite("Data Source=../Persistence/managment.db");
            return new ManagmentDbCtx(builder.Options);
        }
    }
}
