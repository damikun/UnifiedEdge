using Aplication;
using HotChocolate.AspNetCore;
using Aplication.GraphQL.Types;
using Aplication.Graphql.Types;
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
        private const string Endpoint_path = "/graphql";
        private const string BCP_path = "/bcp";
        private const string Voyager_path = "/voyager";
        private const string GA_Tracking = null;
        private const string Persisted_Queries_path = "./persisted_queries";

        //--------------------------------------------------

        public static IServiceCollection AddGraphql(
            this IServiceCollection serviceCollection,
            IWebHostEnvironment env)
        {
            serviceCollection.AddGraphQLServer()
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
                .AddSubscriptionType<Subscription>()
                    .AddTypeExtension<RuntimeSubscription>()

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

                .AddType<SystemEventType>()

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

                .AddType<MqttServerClientSessionType>()
                .AddType<MqttServerClientStatisticsType>()
                .AddType<MqttServerClientType>()

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

        //--------------------------------------------------

        public static GraphQLEndpointConventionBuilder MapGraphQLEndpoint(
            this IEndpointRouteBuilder builder)
        {
            var env = builder.ServiceProvider.GetService<IWebHostEnvironment>();

            return builder.MapGraphQL()
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