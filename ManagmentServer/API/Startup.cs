// Copyright (c) Dalibor Kundrat All rights reserved.
// See LICENSE in root.
using Hangfire;
using ElectronNET.API;
using Aplication.Services;
using HotChocolate.Subscriptions;
using Aplication.Services.Scheduler;
using Aplication.Services.ServerFascade;
using Aplication.Services.SystemEventHandler;
using Aplication.Services.ServerEventHandler;

namespace API
{
    public class Startup
    {
        public Startup(
            IConfiguration configuration,
            IWebHostEnvironment enviroment)
        {
            Configuration = configuration;

            Environment = enviroment;
        }

        public IWebHostEnvironment Environment { get; }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public virtual void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            services.AddCorsConfiguration(Environment, Configuration);

            services.AddSwaggerGen();

            services.AddHttpClient();

            services.AddHealthChecks();

            services.AddGraphql(Environment);

            services.AddRuntimeService();

            services.AddHttpContextAccessor();

            services.AddMemoryCache();

            services.AddPersistence(Configuration, Environment);

            ConfigureTelemetry(services);

            services.AddIdentitiy();

            services.AddGlobalCfg();

            services.AddMediatR();

            services.AddServerFascade();

            services.AddMapper();

            services.AddMqtt();

            services.AddSingleton(services);

            services.AddEndpointProvider();

            services.AddScheduler();

            services.AddServerEventHandler();

            services.AddSystemEventHandler();


            // var provider = Sdk.CreateMeterProviderBuilder()
            // .AddMeter("*")

            // .AddPrometheusExporter()
            // .AddReader(
            //     new ServerMetricReader(
            //         new ServerMetricsToGraphqlExporter(_sender)
            //     )
            // )
            // .Build();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public virtual void Configure(
            IApplicationBuilder app,
            IWebHostEnvironment env,
            IServiceProvider serviceProvider,
            IServiceScopeFactory scopeFactory)
        {
            var _sender = serviceProvider.GetRequiredService<ITopicEventSender>();

            serviceProvider.GetRequiredService<ServerMetricsProvider>();

            // app.UseOpenTelemetryPrometheusScrapingEndpoint();

            app.UseOnStartupProcedures(serviceProvider);

            app.UseScheduledJobs(serviceProvider);

            app.UseHealthChecks("/health");

            // app.UseHttpsRedirection();

            app.UseWebSockets(new WebSocketOptions()
            {

            });

            app.UseFwdHeaders();

            // app.UseOpenTelemetryPrometheusScrapingEndpoint();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("cors_policy");

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            if (env.IsDevelopment())
            {
                app.UseVoyager();
            }

            app.UseHangfireDashboard();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                endpoints.MapGraphQLEndpoint();

                endpoints.MapBCPEndpoint();

                endpoints.MapFallbackToFile("index.html");

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            if (HybridSupport.IsElectronActive)
            {
                CreateWindow();
            }
        }

        private async void CreateWindow()
        {
            var window = await Electron.WindowManager.CreateWindowAsync();

            window.OnClosed += () =>
            {
                Electron.App.Quit();
            };
        }

        public virtual void ConfigureTelemetry(IServiceCollection services)
        {
            services.AddTelemerty(Configuration, Environment);
        }

    }
}