using Domain.Server;
using Domain.Server.Events;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class ServerEventConfiguration : IEntityTypeConfiguration<ServerEventBase>
    {
        public void Configure(EntityTypeBuilder<ServerEventBase> builder)
        {
            builder.HasKey(e => e.ID);

            builder.Property(e => e.Name)
            .IsRequired();

            builder.HasIndex(e => e.ServerUid);
        }
    }
}