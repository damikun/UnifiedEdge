using System.Net;
using Aplication.Services.ServerFascade;

namespace Aplication.Graphql.Mutations
{
    /// <summary>
    /// Mutation
    /// </summary>
    public class Mutation
    {
        public async Task<bool> Test([Service] IEndpointProvider provider)
        {
            // var adapter = provider.GetDefaultAdapter();
            // System.Console.WriteLine("****************");
            // System.Console.WriteLine(adapter.Name);
            // System.Console.WriteLine(adapter.Description);

            // var gateway = provider.GetDefaultGateway();
            // System.Console.WriteLine("****************");
            // System.Console.WriteLine(gateway.ToString());

            // var ip = provider.GetDefaultIp();
            // System.Console.WriteLine("****************");
            // System.Console.WriteLine(ip.ToString());

            // var endpoint = await provider.GetRanodmEndpoint();
            // System.Console.WriteLine("****************");
            // System.Console.WriteLine(endpoint.Address.ToString());
            // System.Console.WriteLine(endpoint.Port);

            var ip = IPAddress.Parse("192.168.100.5");

            var usedports = await provider.GetUsedPorts(ip);

            System.Console.WriteLine("****************");
            foreach (var item in usedports)
            {
                System.Console.WriteLine(item);
            }

            return true;
        }
    }
}
