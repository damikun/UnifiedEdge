using Domain.Server.Events;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Portal.Configuration
{
    public class ServerStateChangedEventConfiguration : IEntityTypeConfiguration<ServerStateChangedEvent>
    {
        public void Configure(EntityTypeBuilder<ServerStateChangedEvent> builder)
        {

        }
    }
}