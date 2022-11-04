using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Portal.Configuration
{
    public class OpcServerConfiguration : IEntityTypeConfiguration<OpcServer>
    {
        public void Configure(EntityTypeBuilder<OpcServer> builder)
        {
            builder.Ignore(e => e.Type);
        }
    }
}