using System.Data;
using OpenTelemetry.Logs;
using Aplication.Services;
using OpenTelemetry.Trace;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;

namespace API
{
    public static partial class ServiceExtension
    {

        public static IServiceCollection AddTelemerty(
            this IServiceCollection serviceCollection,
            IConfiguration Configuration,
            IWebHostEnvironment Environment)
        {
            serviceCollection.AddTelemetryService(Configuration, out string trace_source);

            serviceCollection.AddOpenTelemetryMetrics(builder =>
            {
                builder.AddPrometheusExporter(options =>
                {
                    options.StartHttpListener = true;
                    options.HttpListenerPrefixes = new string[] { $"http://localhost:7090/" };
                    options.ScrapeResponseCacheDurationMilliseconds = 0;
                });

                builder.AddAspNetCoreInstrumentation();

                builder.AddRuntimeMetrics(serviceCollection);

                builder.AddOtlpExporter(options =>
                {
                    // Export to collector
                    options.Endpoint = new Uri(Configuration["ConnectionStrings:OtelCollector"]);

                    options.TimeoutMilliseconds = 10000;

                    // Export dirrectly to APM
                    // options.Endpoint = new Uri("http://localhost:8200"); 
                    // options.BatchExportProcessorOptions = new OpenTelemetry.BatchExportProcessorOptions<Activity>() {
                    // };                
                });
            });

            serviceCollection.AddOpenTelemetryTracing((builder) =>
            {
                // Sources
                builder.AddSource(trace_source);

                builder.SetResourceBuilder(ResourceBuilder
                  .CreateDefault()
                  //   .AddAttributes( new List<KeyValuePair<String, object>> { 
                  //     new KeyValuePair<String, object>("SomeKey", "This is String Value")
                  //     })
                  .AddService(Environment.ApplicationName));

                builder.AddAspNetCoreInstrumentation(opts =>
                {
                    opts.RecordException = true;

                    opts.Enrich = (activity, eventName, rawObject) =>
                    {
                        if (eventName.Equals("OnStartActivity"))
                        {
                            if (rawObject is HttpRequest { Path: { Value: "/graphql" } })
                            {
                                // Do something with request..
                            }
                        }
                    };
                });

                builder.AddSqlClientInstrumentation(x =>

                    x.Enrich = (a, name, cmd) =>
                    {
                        var db_cmd = (IDbCommand)cmd;

                        a.DisplayName = db_cmd.CommandText;

                        if (db_cmd.Connection != null)
                            a.SetTag("peer", db_cmd.Connection.Database);
                    }
                );

                builder.AddHttpClientInstrumentation(
                    opts => opts.RecordException = true);

                builder.AddEntityFrameworkCoreInstrumentation(
                    e => e.SetDbStatementForText = true
                );

                builder.AddHotChocolateInstrumentation();

                builder.AddOtlpExporter(options =>
                {
                    // Export to collector
                    options.Endpoint = new Uri(Configuration["ConnectionStrings:OtelCollector"]);

                    options.TimeoutMilliseconds = 10000;

                    // Export dirrectly to APM
                    // options.Endpoint = new Uri("http://localhost:8200"); 
                    // options.BatchExportProcessorOptions = new OpenTelemetry.BatchExportProcessorOptions<Activity>() {
                    // };                
                });

                // This is example for Jaeger integration
                if (Uri.TryCreate(Configuration.GetConnectionString("Jaeger"), UriKind.Absolute, out var uri))
                {
                    builder.AddJaegerExporter(opts =>
                    {
                        opts.AgentHost = uri.Host;
                        opts.AgentPort = uri.Port;
                    });

                    // builder.AddZipkinExporter(opts => {
                    //     opts.Endpoint = new Uri("http://localhost:9412/api/v2/spans");
                    // });
                }
            });

            serviceCollection.AddLogging(opt =>
            {
                opt.AddTraceSource(trace_source);

                opt.AddOpenTelemetry(e =>
                {
                    e.IncludeFormattedMessage = true;

                    e.IncludeScopes = true;
                });
            });

            // Alternatively defined as options
            serviceCollection.Configure<OpenTelemetryLoggerOptions>(opt =>
            {
                opt.IncludeScopes = true;
                opt.ParseStateValues = true;
                opt.IncludeFormattedMessage = true;
            });

            serviceCollection.AddSingleton<ITelemetry, Telemetry>();

            return serviceCollection;
        }
    }
}