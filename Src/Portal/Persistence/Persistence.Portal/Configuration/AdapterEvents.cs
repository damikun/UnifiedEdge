using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Portal.Configuration
{
    public class AdapterEventConfiguration : IEntityTypeConfiguration<AdapterEvent>
    {
        public void Configure(EntityTypeBuilder<AdapterEvent> builder)
        {
            builder.HasKey(e => e.ID);

            builder.HasIndex(e => e.AdapterId);
        }
    }
}