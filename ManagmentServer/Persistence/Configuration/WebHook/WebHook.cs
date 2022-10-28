using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class WebHookBaseConfiguration : IEntityTypeConfiguration<WebHook>
    {
        public void Configure(EntityTypeBuilder<WebHook> builder)
        {
            builder.HasKey(e => e.Id);

            builder.HasMany(e => e.Headers)
            .WithOne(e => e.WebHook)
            .HasForeignKey(e => e.WebHookID)
            .OnDelete(DeleteBehavior.ClientCascade);

            builder.HasMany(e => e.Records)
            .WithOne(e => e.WebHook)
            .HasForeignKey(e => e.WebHookID)
            .OnDelete(DeleteBehavior.ClientCascade);

            builder.OwnsOne(e => e.EventGroup);

        }
    }
}