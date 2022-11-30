using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Portal.Configuration
{
    public class MqttAuthClientConfiguration
        : IEntityTypeConfiguration<MqttAuthClient>
    {
        public void Configure(EntityTypeBuilder<MqttAuthClient> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(e => e.ClientId)
            .IsRequired();

            // builder.HasIndex(e => e.ClientId);
        }
    }
}