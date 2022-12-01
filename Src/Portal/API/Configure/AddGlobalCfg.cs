using Aplication.Services;
using Aplication.Interfaces;
using Aplication.Core.Pagination;

namespace API
{
    public static partial class ServiceExtension
    {
        /// Provides global DI object registrations that are shared between different parts of Aplication logic
        public static IServiceCollection AddGlobalCfg(
            this IServiceCollection serviceCollection)
        {
            serviceCollection.AddSingleton(
                typeof(ICursorPagination<>), typeof(CursorPagination<>)
            );

            serviceCollection.AddScoped<ICurrentUser, CurrentUser>();

            serviceCollection.AddSingleton<IPasswordHasher, PasswordHasher>();

            serviceCollection.AddTransient(provider =>
            {
                var loggerFactory = provider.GetRequiredService<ILoggerFactory>();
                const string categoryName = "Any";
                return loggerFactory.CreateLogger(categoryName);
            });

            return serviceCollection;
        }
    }
}