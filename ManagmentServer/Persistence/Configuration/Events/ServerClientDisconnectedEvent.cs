using Domain.Server.Events;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class ServerClientDisconnectedEventConfiguration : IEntityTypeConfiguration<ServerClientDisconnectedEvent>
    {
        public void Configure(EntityTypeBuilder<ServerClientDisconnectedEvent> builder)
        {

        }
    }
}