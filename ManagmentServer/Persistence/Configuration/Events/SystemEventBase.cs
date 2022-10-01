using Domain.System.Events;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class SystemEventConfiguration : IEntityTypeConfiguration<SystemEvent>
    {
        public void Configure(EntityTypeBuilder<SystemEvent> builder)
        {
            builder.HasKey(e => e.ID);

            builder.Property(e => e.Name)
            .IsRequired();
        }
    }
}