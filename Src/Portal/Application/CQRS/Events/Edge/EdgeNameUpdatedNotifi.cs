using MediatR;
using Aplication.DTO;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.EdgeCfg
{

    /// <summary>
    /// Notifi Edge name was updated
    /// </summary>
    public class EdgeNameUpdatedNotifi : EdgeBaseNotifi
    {
        public EdgeNameUpdatedNotifi(DTO_Edge edge) : base(edge)
        {

        }
    }

    /// <summary>
    /// Command handler for user <c>EdgeNameUpdatedNotifi</c>
    /// </summary>
    public class EdgeNameUpdatedNotifi_Handler : INotificationHandler<EdgeNameUpdatedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public EdgeNameUpdatedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>EdgeNameUpdatedNotifi</c>
        /// </summary>
        public Task Handle(EdgeNameUpdatedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}