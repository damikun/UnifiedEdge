using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Portal.Configuration
{
    public class ServerBaseConfiguration : IEntityTypeConfiguration<ServerBase>
    {
        public void Configure(EntityTypeBuilder<ServerBase> builder)
        {
            builder.HasKey(e => new { e.ID, e.UID });

            builder.Property(e => e.UID)
            .IsRequired();

            builder.HasOne(e => e.Cfg)
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade);

            builder.Ignore(e => e.Type);

            builder.HasMany(e => e.Endpoints)
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade);

            builder.Property(e => e.UID)
            .HasConversion(v => v.Replace("-", "").Replace(".", ""), v => v);
        }
    }
}