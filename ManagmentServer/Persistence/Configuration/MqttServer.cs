using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class MqttServerConfiguration : IEntityTypeConfiguration<MqttServer>
    {
        public void Configure(EntityTypeBuilder<MqttServer> builder)
        {
            builder.Ignore(e => e.Type);
        }
    }
}