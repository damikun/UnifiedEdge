// Copyright (c) Dalibor Kundrat All rights reserved.
// See LICENSE in root.

using ElectronNET.API;
using Serilog;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            try
            {
                var host = CreateHostBuilder(args).Build();

                ServiceExtension.ConfigureLogging(host);

                host.Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Runtime unhandled exception");
            }
            finally
            {
                // Log.CloseAndFlush();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseElectron(args);
                    webBuilder.UseEnvironment("Development");
                    webBuilder.UseStartup<Startup>();

                    if (HybridSupport.IsElectronActive)
                    {
                        webBuilder.UseUrls("https://+:5001");
                    }

                })
                .UseSerilog();
    }
}
