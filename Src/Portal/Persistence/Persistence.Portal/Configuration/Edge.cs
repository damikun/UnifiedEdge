using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Portal.Configuration
{
    public class EdgeCnfiguration : IEntityTypeConfiguration<Edge>
    {
        public void Configure(EntityTypeBuilder<Edge> builder)
        {

            builder.HasKey(e => e.Id);

        }
    }
}