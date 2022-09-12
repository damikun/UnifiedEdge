using Server.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class ServerDataBaseConfiguration : IEntityTypeConfiguration<ServerDataBase>
    {
        public void Configure(EntityTypeBuilder<ServerDataBase> builder)
        {
            builder.HasKey(e => e.ServerID);

            builder.HasOne(e => e.Server).WithOne(e => e.Data);
        }
    }
}