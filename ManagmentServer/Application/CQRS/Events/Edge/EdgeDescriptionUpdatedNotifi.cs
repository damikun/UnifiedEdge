using MediatR;
using Aplication.DTO;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.EdgeCfg
{

    /// <summary>
    /// Notifi Edge Description was updated
    /// </summary>
    public class EdgeDescriptionUpdatedNotifi : EdgeBaseNotifi
    {
        public EdgeDescriptionUpdatedNotifi(DTO_Edge edge) : base(edge)
        {

        }
    }

    /// <summary>
    /// Command handler for user <c>EdgeDescriptionUpdatedNotifi</c>
    /// </summary>
    public class EdgeDescriptionUpdatedNotifi_Handler : INotificationHandler<EdgeDescriptionUpdatedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public EdgeDescriptionUpdatedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>EdgeDescriptionUpdatedNotifi</c>
        /// </summary>
        public Task Handle(EdgeDescriptionUpdatedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}