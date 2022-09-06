using Server.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class ServerBaseConfiguration : IEntityTypeConfiguration<ServerBase>
    {
        public void Configure(EntityTypeBuilder<ServerBase> builder)
        {
            builder.HasKey(e => e.ID);
        }
    }
}