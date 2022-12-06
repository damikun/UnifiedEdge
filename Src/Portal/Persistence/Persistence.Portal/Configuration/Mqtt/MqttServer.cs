using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Portal.Configuration
{
    public class MqttAuthServerConfiguration
        : IEntityTypeConfiguration<MqttServer>
    {
        public void Configure(EntityTypeBuilder<MqttServer> builder)
        {
            builder.Ignore(e => e.Type);

            builder.HasOne(e => e.AuthConfig)
            .WithOne(e => e.Server)
            .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(e => e.AuthClients)
            .WithOne(e => e.Server)
            .HasForeignKey(e => e.ServerId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(e => e.AuthUsers)
            .WithOne(e => e.Server)
            .HasForeignKey(e => e.ServerId)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}