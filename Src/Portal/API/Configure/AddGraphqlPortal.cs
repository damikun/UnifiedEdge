using Aplication;
using HotChocolate.AspNetCore;
using Aplication.GraphQL.Types;
using Aplication.Graphql.Types;
using Aplication.Graphql.Errors;
using GraphQL.Server.Ui.Voyager;
using Aplication.Graphql.Queries;
using Aplication.Graphql.Mutations;
using Aplication.Graphql.Interfaces;
using HotChocolate.Types.Pagination;
using Aplication.Graphql.DataLoaders;
using Microsoft.Extensions.Primitives;
using HotChocolate.AspNetCore.Extensions;
using HotChocolate.Execution.Configuration;

namespace API
{
    public static partial class ServiceExtension
    {
        private const string Endpoint_path = "/internal";
        private const string BCP_path = "/bcp";
        private const string Voyager_path = "/voyager";
        private const string GA_Tracking = null;
        private const string Persisted_Queries_path = "./persisted_queries";

        //--------------------------------------------------

        public static IServiceCollection AddGraphqlPortal(
            this IServiceCollection serviceCollection,
            IWebHostEnvironment env)
        {
            serviceCollection.AddGraphQLServer("internal")
                .SetPagingOptions(
                    new PagingOptions
                    {
                        IncludeTotalCount = true,
                        DefaultPageSize = 25,
                        MaxPageSize = 200
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
                .AllowIntrospection(env.IsDevelopment())
                .AddExportDirectiveType()

                .ModifyOptions(options =>
                {
                    options.UseXmlDocumentation = true;

                    options.SortFieldsByName = true;

                    // options.RemoveUnreachableTypes = true;

                    options.StrictValidation = false;
                })

                .AddGlobalObjectIdentification()
                .AddQueryFieldToMutationPayloads()
                .AddMutationConventions(true)

                .AddFiltering()
                .AddSorting()

                .AddErrorInterfaceType<IResultError>()

                .AddQueryType<QueryType>()
                    .AddTypeExtension<SystemQueries>()
                    .AddTypeExtension<MqttQueries>()
                    .AddTypeExtension<UserQueries>()
                    .AddTypeExtension<GlobalQueries>()
                    .AddTypeExtension<ServerQueries>()
                    .AddTypeExtension<SchedulerQueries>()
                .AddMutationType<MutationType>()
                    .AddTypeExtension<TestMutations>()
                    .AddTypeExtension<MqttMutations>()
                    .AddTypeExtension<OpcMutations>()
                    .AddTypeExtension<ServerMutations>()
                    .AddTypeExtension<EdgeMutations>()
                    .AddTypeExtension<UserMutations>()
                    .AddTypeExtension<GlobalMutations>()
                .AddSubscriptionType<Subscription>()
                    .AddTypeExtension<RuntimeSubscription>()
                    .AddTypeExtension<ServerSubscription>()
                    .AddTypeExtension<MqttServerSubscription>()

                .BindRuntimeType<DateTime, DateTimeType>()
                .BindRuntimeType<TimeSpan, TimeSpanType>()
                .BindRuntimeType<int, IntType>()
                .BindRuntimeType<long, LongType>()
                // .BindRuntimeType<IPAddress, IPAddressType>()

                .AddType<MqttServerEndpointType>()

                .AddType<MetricType>()
                .AddType<RuntimeMetricsType>()
                .AddType<RuntimeMetricsSourceType>()

                .AddType<DefaultAdapterType>()
                .AddType<FailedJobType>()
                .AddType<SchedulerJobDetailType>()
                .AddType<SchedulerJobParameterType>()
                .AddType<SchedulerJobsStatisticType>()
                .AddType<SchedulerRecurringJobType>()
                .AddType<ScheduleStateEnumType>()
                .AddType<SchedulerSuccessJobType>()

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

                .AddType<MqttClientStatsUpdateType>()

                .AddType<AdapterLogType>()
                .AddType<RemoveServerDataType>()
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
                // .AddInterfaceType<IServerType>()

                .AddDataLoader<UserByIdDataLoader>()
                .AddDataLoader<ServerClientSessionByServerIdAndClientId>()

                .AddInMemorySubscriptions()
                .UseCustomPipeline();


            // .UseReadPersistedQuery();
            // .AddReadOnlyFileSystemQueryStorage(Persisted_Queries_path);

            return serviceCollection;
        }

        //--------------------------------------------------

        public static IRequestExecutorBuilder UseCustomPipeline(
            this IRequestExecutorBuilder builder)
        {
            if (builder is null)
            {
                throw new ArgumentNullException(nameof(builder));
            }

            // !The order of call defines pipeline!

            return builder
                .UseInstrumentation()
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

        //--------------------------------------------------

        public static GraphQLEndpointConventionBuilder MapInternalGraphQLEndpoint(
            this IEndpointRouteBuilder builder)
        {
            var env = builder.ServiceProvider.GetService<IWebHostEnvironment>();

            return builder.MapGraphQL(Endpoint_path, "internal")
            .WithOptions(new GraphQLServerOptions
            {

                EnableSchemaRequests = env.IsDevelopment(),
                Tool = {
                    Enable = env.IsDevelopment(),
                }
            });
        }

        //--------------------------------------------------

        public static BananaCakePopEndpointConventionBuilder MapBCPEndpoint(
            this IEndpointRouteBuilder builder)
        {
            var env = builder.ServiceProvider.GetService<IWebHostEnvironment>();

            return builder.MapBananaCakePop(BCP_path)
                .WithOptions(new GraphQLToolOptions
                {
                    Enable = env.IsDevelopment(),
                    DisableTelemetry = true,
                    HttpHeaders = new HeaderDictionary(
                            new Dictionary<string, StringValues>()
                            {
                                { "x-csrf","1" }
                            }
                        ),
                    GaTrackingId = GA_Tracking ?? "",
                    UseBrowserUrlAsGraphQLEndpoint = true,
                    GraphQLEndpoint = Endpoint_path,
                });
        }

        //--------------------------------------------------

        public static IApplicationBuilder UseVoyager(
            this IApplicationBuilder builder)
        {
            var env = builder.ApplicationServices.GetService<IWebHostEnvironment>();

            var opt = new VoyagerOptions()
            {
                Headers = new Dictionary<string, object>()
                {
                    { "x-csrf",1}
                }
            };

            return builder.UseGraphQLVoyager(opt, Voyager_path);

        }
    }
}