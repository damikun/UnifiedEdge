using Domain.Server.Events;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Portal.Configuration
{
    public class ServerClientConnectedEventConfiguration : IEntityTypeConfiguration<ServerClientConnectedEvent>
    {
        public void Configure(EntityTypeBuilder<ServerClientConnectedEvent> builder)
        {

        }
    }
}