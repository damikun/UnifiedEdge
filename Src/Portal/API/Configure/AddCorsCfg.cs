
namespace API
{
    public static partial class ServiceExtension
    {
        public static IServiceCollection AddCorsConfiguration(
        this IServiceCollection serviceCollection,
        IWebHostEnvironment env,
        IConfiguration cfg)
        {

            List<string> allowed_origins = new List<string>();

            allowed_origins.AddRange(new string[]{
                "https://localhost:7060",
                "http://localhost:5089",
                "https://localhost:44459",
                "https://localhost:44459/",
                "https://localhost",
                "http://127.0.0.1",
                "https://127.0.0.1",
                "http://host.docker.internal",
                "http://host.docker.internal:7060",
                "http://host.docker.internal:7090",
                "http://localhost:7090",
                "http://host.docker.internal",
                "https://studio.apollographql.com",
                "wss://localhost:7060",
                "wss://localhost:7060/graphql",
                "wss://localhost:7060/",
                "wss://localhost:5001",
                "wss://localhost:5001/internal",
                "wss://localhost:5001/",
                "wss://localhost:8003",
                "wss://localhost:8003/graphql",
                "wss://localhost:8003/",
                "ws://localhost:8003",
                "ws://localhost:8003/graphql",
                "ws://localhost:8003/",
                "http://localhost:8003",
                "https://localhost:8003",
                "http://localhost:5000",
                "https://localhost:5001",
                "http://localhost:5000/internal",
                "https://localhost:5001/internal"
            });

            serviceCollection.AddCors(options =>
            {
                // options.AddPolicy("CorsPolicy",
                // builder => builder.AllowAnyOrigin()
                // .AllowAnyMethod()
                // .AllowAnyHeader());

                options.AddPolicy("cors_policy", policy =>
                {
                    policy.AllowAnyHeader();
                    policy.AllowAnyMethod();
                    //------------------------------------
                    policy.WithOrigins(allowed_origins.ToArray());
                    // policy.AllowAnyOrigin();
                    //------------------------------------
                    policy.AllowCredentials();
                    policy.SetPreflightMaxAge(TimeSpan.FromSeconds(10000));
                });
            });

            return serviceCollection;

        }
    }
}