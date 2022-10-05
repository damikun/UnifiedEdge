using MediatR;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.Server
{
    /// <summary>
    /// Notifi Server Location was updated
    /// </summary>
    public class ServerLocationUpdatedNotifi : ServerBaseNotifi
    {
        public ServerLocationUpdatedNotifi(string server_guid)
            : base(server_guid)
        {

        }
    }

    /// <summary>
    /// Command handler for user <c>ServerLocationUpdatedNotifi</c>
    /// </summary>
    public class ServerLocationUpdatedNotifi_Handler : INotificationHandler<ServerLocationUpdatedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public ServerLocationUpdatedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>ServerLocationUpdatedNotifi</c>
        /// </summary>
        public Task Handle(ServerLocationUpdatedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

}