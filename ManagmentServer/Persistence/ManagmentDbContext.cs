using Domain;
using Server.Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{

    public class ManagmentDbCtx : DbContext
    {
        public DbSet<ServerBase> Servers { get; set; }

        public DbSet<Edge> Edge { get; set; }
        public ManagmentDbCtx(
            DbContextOptions<ManagmentDbCtx> options)
            : base(options)
        {

        }

        private bool IsNpgsql()
        {
            return this.Database.ProviderName == "Npgsql.EntityFrameworkCore.PostgreSQL";
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ManagmentDbCtx).Assembly);

            if (IsNpgsql())
            {
                // modelBuilder.Entity<WebHook>().Property(e => e.HookEvents).HasConversion(
                //     new EnumArrToString_StringToEnumArr_Converter(
                //         e => EnumArrToString_StringToEnumArr_Converter.Convert(e),
                //         s => EnumArrToString_StringToEnumArr_Converter.Convert(s)
                //     )
                // );
            }

            modelBuilder.Entity<MqttServer>().ToTable("MqttServer");
            modelBuilder.Entity<OpcServer>().ToTable("OpcServer");

            //---------------------
            // Initial DB data
            //---------------------

            modelBuilder.Entity<Edge>().HasData(
                new Edge()
                {
                    Id = 1,
                    Name = "Undefined",
                    Guid = Guid.NewGuid().ToString()
                }
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}