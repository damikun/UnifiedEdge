using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class ServerEventConfiguration : IEntityTypeConfiguration<ServerEvent>
    {
        public void Configure(EntityTypeBuilder<ServerEvent> builder)
        {
            builder.HasKey(e => e.ID);

            builder.Property(e => e.Name)
            .IsRequired();
        }
    }
}