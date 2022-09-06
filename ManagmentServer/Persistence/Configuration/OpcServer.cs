using Server.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class OpcServerConfiguration : IEntityTypeConfiguration<OpcServer>
    {
        public void Configure(EntityTypeBuilder<OpcServer> builder)
        {
            // builder.HasKey(e => e.ID);
        }
    }
}