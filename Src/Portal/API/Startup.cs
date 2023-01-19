// Copyright (c) Dalibor Kundrat All rights reserved.
// See LICENSE in root.
using Hangfire;
using ElectronNET.API;
using Aplication.Core;
using Aplication.Services;
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
            services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.WriteIndented = true;
                options.JsonSerializerOptions.IncludeFields = true;

                options.JsonSerializerOptions.Converters.Add(
                    new System.Text.Json.Serialization.JsonStringEnumConverter()
                );
            });

            services.AddCorsConfiguration(Environment, Configuration);

            services.AddEndpointsApiExplorer();

            services.AddOpenAPI();

            services.AddHttpClient();

            services.AddHealthChecks();

            services.AddGraphqlPortal(Environment);

            services.AddGraphqlPublic(Environment);

            services.AddRuntimeService();

            services.AddHttpContextAccessor();

            services.AddMemoryCache();

            services.AddPersistence(Configuration, Environment);

            ConfigureTelemetry(services);

            services.AddSecurity();

            services.AddMapper();

            services.AddMediatR();

            services.AddGlobalCfg();

            services.AddServerFascade();

            services.AddMqtt();

            services.AddSingleton(services);

            services.AddEndpointProvider();

            services.AddScheduler();

            services.AddServerEventHandler();

            services.AddElectron();

            services.AddSystemEventHandler();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public virtual void Configure(
            IApplicationBuilder app,
            IWebHostEnvironment env,
            IServiceProvider serviceProvider,
            IServiceScopeFactory scopeFactory)
        {
            serviceProvider.GetRequiredService<ServerMetricsProvider>();

            // app.UseOpenTelemetryPrometheusScrapingEndpoint();

            app.UseOnStartupProcedures(serviceProvider);

            app.UseScheduledJobs(serviceProvider);

            app.UseHealthChecks("/health");

            app.UseHttpsRedirection();

            app.UseWebSockets(new WebSocketOptions() { });

            app.UseFwdHeaders();

            // app.UseOpenTelemetryPrometheusScrapingEndpoint();

            app.UseResponseCaching();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("cors_policy");

            if (env.IsDevelopment())
            {
                app.UseVoyager();
            }

            app.UseSwagger();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseSwaggerUI();
            }

            // app.UseIdentityServer();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseHangfireDashboard();

            app.UseEndpoints(endpoints =>
            {
                if (env.IsDevelopment())
                {
                    endpoints.MapBCPEndpoint();

                    endpoints.MapSwagger();
                }

                endpoints.MapRazorPages();

                endpoints.MapControllers()
                .AddEndpointFilter(
                    new RestGate()
                );

                endpoints.MapInternalGraphQLEndpoint();

                endpoints.MapPublicGraphQLEndpoint()
                .AddEndpointFilter(
                    new GraphqlGate()
                );

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{id?}");

                endpoints.MapFallbackToFile("index.html");
            });

            if (HybridSupport.IsElectronActive)
            {
                CreateWindow();
            }
        }

        private async void CreateWindow()
        {
            var window = await Electron.WindowManager.CreateWindowAsync(
                loadUrl: "https://localhost:5001"
            );

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