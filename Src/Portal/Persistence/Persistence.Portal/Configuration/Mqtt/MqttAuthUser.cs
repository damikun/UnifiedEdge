using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Portal.Configuration
{
    public class MqttUserConfiguration
        : IEntityTypeConfiguration<MqttAuthUser>
    {
        public void Configure(EntityTypeBuilder<MqttAuthUser> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(e => e.UserName)
            .IsRequired();

            builder.Property(e => e.Password)
            .IsRequired();

            // builder.HasIndex(e => e.UserName);
        }
    }
}