using MediatR;
using AutoMapper;
using Server.Mqtt.DTO;
using Aplication.CQRS.Queries;
using Microsoft.Extensions.DependencyInjection;

namespace Aplication.Graphql.DataLoaders
{

    public class ServerClientSessionByServerIdAndClientId
        : BatchDataLoader<(string server_id, string server_client_id), GQL_MqttClientSession?>
    {

        /// <summary>
        /// Injected <c>IServiceProvider</c>
        /// </summary>
        private readonly IServiceProvider _services;

        public ServerClientSessionByServerIdAndClientId(
            IBatchScheduler scheduler,
            IServiceProvider services) : base(scheduler)
        {
            _services = services;
        }

        protected async override Task<IReadOnlyDictionary<(string server_id, string server_client_id), GQL_MqttClientSession?>> LoadBatchAsync(
            IReadOnlyList<(string server_id, string server_client_id)> keys,
            CancellationToken cancellationToken
        )
        {
            var mediator = _services.GetRequiredService<IMediator>();

            var mapper = _services.GetRequiredService<IMapper>();

            try
            {
                var result = await mediator.Send(new GetMqttServerClientsSessions() { compositKeys = keys });

                return mapper.Map<Dictionary<(string server_id, string server_client_id), GQL_MqttClientSession?>>(result);
            }
            catch
            {
                return Empty()!;
            }
        }

        private Dictionary<(string server_id, string server_client_id), GQL_MqttClientSession?> Empty()
        {
            return new Dictionary<(string server_id, string server_client_id), GQL_MqttClientSession?>();
        }
    }
}
