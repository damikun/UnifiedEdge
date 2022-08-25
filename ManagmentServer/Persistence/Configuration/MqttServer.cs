using Server.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class WebHookonfiguration : IEntityTypeConfiguration<MqttServer>
    {
        public void Configure(EntityTypeBuilder<MqttServer> builder)
        {

            builder.HasKey(e => e.ID);

        }
    }
}