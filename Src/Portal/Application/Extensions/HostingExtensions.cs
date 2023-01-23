

namespace Microsoft.Extensions.Hosting
{

    public static class HostEnvExtensions
    {
        public static bool IsDocker(this IHostEnvironment hostEnvironment)
        {
            return Environment.GetEnvironmentVariable("DOTNET_RUNNING_IN_CONTAINER") == "true";
        }
    }
}