using Aplication;
using Aplication.Graphql.Types;
using Aplication.Graphql.Queries;
using Aplication.Graphql.Interfaces;
using HotChocolate.Types.Pagination;
using Aplication.Graphql.DataLoaders;
using HotChocolate.Execution.Configuration;
using HotChocolate.AspNetCore.Extensions;
using HotChocolate.AspNetCore;

namespace API
{
    public static partial class PublicServiceExtension
    {
        private const string Endpoint_path = "/public";
        private const string Voyager_path = "/voyager";

        //--------------------------------------------------

        public static IServiceCollection AddGraphqlPublic(
            this IServiceCollection serviceCollection,
            IWebHostEnvironment env)
        {
            serviceCollection.AddGraphQLServer("public")
                .SetPagingOptions(
                    new PagingOptions
                    {
                        IncludeTotalCount = true,
                        DefaultPageSize = 25,
                        MaxPageSize = 50
                    })
                .ModifyRequestOptions(requestExecutorOptions =>
                {
                    if (env.IsDevelopment() ||
                        System.Diagnostics.Debugger.IsAttached)
                    {
                        requestExecutorOptions.ExecutionTimeout = TimeSpan.FromMinutes(1);
                    }

                    requestExecutorOptions.IncludeExceptionDetails = !env.IsProduction();
                })
                .AllowIntrospection(true)
                .AddExportDirectiveType()

                .ModifyOptions(options =>
                {
                    options.UseXmlDocumentation = true;

                    options.SortFieldsByName = true;

                    options.StrictValidation = false;
                })

                .AddGlobalObjectIdentification()
                .AddQueryFieldToMutationPayloads()
                .AddMutationConventions(true)

                .AddQueryType<PublicQueryType>()
                    .AddTypeExtension<PublicSystemQueries>()
                    .AddTypeExtension<PublicMqttQueries>()
                    .AddTypeExtension<PublicGlobalQueries>()
                    .AddTypeExtension<PublicServerQueries>()

                .BindRuntimeType<DateTime, DateTimeType>()
                .BindRuntimeType<TimeSpan, TimeSpanType>()
                .BindRuntimeType<int, IntType>()
                .BindRuntimeType<long, LongType>()

                .AddType<MqttServerEndpointType>()

                .AddType<MetricType>()
                .AddType<RuntimeMetricsType>()
                .AddType<RuntimeMetricsSourceType>()

                .AddType<DefaultAdapterType>()

                .AddType<WebHookRecordType>()
                .AddType<WebHookType>()

                .AddType<SystemEventType>()
                .AddType<MqttServerStatsType>()

                .AddType<EdgeType>()

                .AddType<ServerStateChangedNotificationType>()

                .AddType<ServerEventsUnionType>()
                .AddType<ClientConnectedType>()
                .AddType<ServerConfigDiffEventType>()
                .AddType<ServerErrorEventType>()
                .AddType<ServerEventTypeType>()
                .AddType<ServerInfoEventType>()
                .AddType<ServerStateChangedEventType>()
                .AddType<IServerEventType>()
                .AddType<ServerMetricsSourceType>()

                .AddType<MqttServerClientSessionType>()
                .AddType<MqttServerClientStatisticsType>()
                .AddType<MqttServerClientType>()

                .AddType<MqttServerClientConfigType>()

                .AddType<AdapterType>()
                .AddType<AdapterStateEnumType>()
                .AddType<AdapterInterfaceEnumType>()

                .AddType<AdapterLogType>()
                .AddType<RemoveServerPayloadType>()
                .AddType<UserType>()
                .AddType<CpuMetricsType>()
                .AddType<OsType>()
                .AddType<MqttServerType>()
                .AddType<UptimeType>()
                .AddType<ServerMetricsType>()
                .AddType<MemoryMetricsType>()
                .AddType<SystemInfoType>()
                .AddType<HistorianRecordType>()
                .AddType<IServerType>()

                .AddDataLoader<ServerClientSessionByServerIdAndClientId>()

                .AddInMemorySubscriptions()
                .UsePublicPipeline();


            // .UseReadPersistedQuery();
            // .AddReadOnlyFileSystemQueryStorage(Persisted_Queries_path);

            return serviceCollection;
        }

        //--------------------------------------------------

        public static IRequestExecutorBuilder UsePublicPipeline(
            this IRequestExecutorBuilder builder)
        {
            if (builder is null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            // !The order of call defines pipeline!

            return builder
                .UseInstrumentations()
                .UseExceptions()
                .UseTimeout()
                .UseDocumentCache()
                // .UseReadPersistedQuery()
                .UseDocumentParser()
                .UseDocumentValidation()
                .UseOperationCache()
                .UseOperationComplexityAnalyzer()
                .UseOperationResolver()
                .UseOperationVariableCoercion()
                .UseOperationExecution();
        }


        public static GraphQLEndpointConventionBuilder MapPublicGraphQLEndpoint(
            this IEndpointRouteBuilder builder)
        {
            var env = builder.ServiceProvider.GetService<IWebHostEnvironment>();

            return builder.MapGraphQL(Endpoint_path, "public")
            .WithOptions(new GraphQLServerOptions
            {

                EnableSchemaRequests = env.IsDevelopment(),
                Tool = {
                    Enable = env.IsDevelopment(),
                }
            });
        }

    }
}