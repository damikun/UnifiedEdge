using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configuration
{
    public class WebHookBaseConfiguration : IEntityTypeConfiguration<WebHook>
    {
        public void Configure(EntityTypeBuilder<WebHook> builder)
        {
            builder.HasKey(e => new { e.Id });

            builder.HasIndex(e => e.Uid);

            builder.Property(e => e.Name)
            .IsRequired();

            builder.HasMany(e => e.Headers)
            .WithOne(e => e.WebHook)
            .HasForeignKey(e => e.WebHookID)
            .OnDelete(DeleteBehavior.ClientCascade);

            builder.HasMany(e => e.Records)
            .WithOne(e => e.WebHook)
            .HasForeignKey(e => e.WebHookID)
            .OnDelete(DeleteBehavior.ClientCascade);

            builder.Property(e => e.EventGroup)
            .HasConversion(
                new EnumArrToString_StringToEnumArr_Converter(
                    e => EnumArrToString_StringToEnumArr_Converter.Convert(e),
                    s => EnumArrToString_StringToEnumArr_Converter.Convert(s)
                )
            );

            // builder.OwnsOne(e => e.EventGroup);

        }
    }
}