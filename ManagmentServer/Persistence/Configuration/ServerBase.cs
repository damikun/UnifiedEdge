using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class ServerBaseConfiguration : IEntityTypeConfiguration<ServerBase>
    {
        public void Configure(EntityTypeBuilder<ServerBase> builder)
        {
            builder.HasKey(e => new { e.ID, e.UID });

            builder.Property(e => e.UID)
            .IsRequired();

            builder.HasOne(e => e.Cfg);

            builder.Ignore(e => e.Type);
        }
    }
}