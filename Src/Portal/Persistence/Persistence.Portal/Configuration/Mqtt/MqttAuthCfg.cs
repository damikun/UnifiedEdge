using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Portal.Configuration
{
    public class MqttAuthConfigConfiguration
        : IEntityTypeConfiguration<MqttAuthConfig>
    {
        public void Configure(EntityTypeBuilder<MqttAuthConfig> builder)
        {
            builder.HasKey(e => e.Id);
        }
    }
}