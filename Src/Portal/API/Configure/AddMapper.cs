using AutoMapper;
using Aplication.Mapping;

namespace API
{
    public static partial class ServiceExtension
    {
        public static IServiceCollection AddMapper(
            this IServiceCollection serviceCollection)
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile<MappingProfile>();
                mc.AddProfile(new Internall_Profile());
                mc.AddProfile(new Server_Map_Profile());
                mc.AddProfile(new Graphql_Map_Profile());
                mc.AddProfile(new Metrics_Map_Profile());
                mc.AddProfile(new System_Profile());
            });

            IMapper mapper = mappingConfig.CreateMapper();

            serviceCollection.AddSingleton(mapper);

            return serviceCollection;
        }
    }
}