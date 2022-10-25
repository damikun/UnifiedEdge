using Domain.Server.Events;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class ServerConfigDiffEventConfiguration : IEntityTypeConfiguration<ServerConfigDiffEvent>
    {
        public void Configure(EntityTypeBuilder<ServerConfigDiffEvent> builder)
        {

        }
    }
}