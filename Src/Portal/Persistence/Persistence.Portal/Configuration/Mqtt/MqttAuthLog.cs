using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Portal.Configuration
{
    public class MqttAuthLogConfiguration
        : IEntityTypeConfiguration<MqttAuthLog>
    {
        public void Configure(EntityTypeBuilder<MqttAuthLog> builder)
        {
            builder.HasKey(e => e.Id);
        }
    }
}