using Microsoft.AspNetCore.HttpOverrides;

namespace API
{
    public static partial class ServiceExtension
    {

        public static IApplicationBuilder UseFwdHeaders(
            this IApplicationBuilder builder)
        {
            return builder.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor |
                ForwardedHeaders.XForwardedProto |
                ForwardedHeaders.XForwardedHost
            });
        }

    }
}