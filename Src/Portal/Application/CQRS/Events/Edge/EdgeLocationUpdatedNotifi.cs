using MediatR;
using Aplication.DTO;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.EdgeCfg
{

    /// <summary>
    /// Notifi Edge Location was updated
    /// </summary>
    public class EdgeLocationUpdatedNotifi : EdgeBaseNotifi
    {
        public EdgeLocationUpdatedNotifi(DTO_Edge edge) : base(edge)
        {

        }
    }

    /// <summary>
    /// Command handler for user <c>EdgeLocationUpdatedNotifi</c>
    /// </summary>
    public class EdgeLocationUpdatedNotifi_Handler : INotificationHandler<EdgeLocationUpdatedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public EdgeLocationUpdatedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>EdgeLocationUpdatedNotifi</c>
        /// </summary>
        public Task Handle(EdgeLocationUpdatedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}