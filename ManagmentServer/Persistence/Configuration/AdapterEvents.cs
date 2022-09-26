using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class AdapterEventConfiguration : IEntityTypeConfiguration<AdapterEvent>
    {
        public void Configure(EntityTypeBuilder<AdapterEvent> builder)
        {
            builder.HasKey(e => new { e.ID, e.AdapterId });
        }
    }
}