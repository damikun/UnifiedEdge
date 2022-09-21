using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class ServerIPv4EndpointConfiguration : IEntityTypeConfiguration<ServerIPv4Endpoint>
    {
        public void Configure(EntityTypeBuilder<ServerIPv4Endpoint> builder)
        {
            builder.HasKey(e => e.Id);

            builder.HasIndex(e => e.IpAddress);

            builder.HasIndex(e => e.Port);
        }
    }
}