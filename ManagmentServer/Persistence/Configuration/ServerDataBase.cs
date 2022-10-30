using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class ServerCfgBaseConfiguration : IEntityTypeConfiguration<ServerCfgBase>
    {
        public void Configure(EntityTypeBuilder<ServerCfgBase> builder)
        {
            builder.HasKey(e => e.ServerUID);

            builder.Ignore(e => e.Type);

            builder.HasOne(e => e.Server)
            .WithOne(e => e.Cfg)
            .HasPrincipalKey<ServerCfgBase>(e => e.ServerUID);

        }
    }
}