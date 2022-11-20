using MediatR;
using Aplication.CQRS.Queries;
using Microsoft.Extensions.DependencyInjection;

namespace Aplication.Graphql.DataLoaders
{

    public class ClientStateByServerAndClientUids : BatchDataLoader<(string serverUid, string clientUid), bool>
    {

        /// <summary>
        /// Injected <c>IServiceProvider</c>
        /// </summary>
        private readonly IServiceProvider _services;

        public ClientStateByServerAndClientUids(
            IBatchScheduler scheduler,
            IServiceProvider services) : base(scheduler)
        {
            _services = services;

        }

        protected async override Task<IReadOnlyDictionary<(string serverUid, string clientUid), bool>> LoadBatchAsync(
            IReadOnlyList<(string serverUid, string clientUid)> keys,
            CancellationToken cancellationToken)
        {
            var mediator = _services.GetRequiredService<IMediator>();

            try
            {
                return await mediator.Send(new GetMqttServerClientsState() { Keys = keys });
            }
            catch
            {
                return Empty()!;
            }
        }

        private Dictionary<(string serverUid, string clientUid), bool> Empty()
        {
            return new Dictionary<(string serverUid, string clientUid), bool>();
        }
    }
}
