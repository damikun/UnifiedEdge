using MediatR;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.Server
{
    /// <summary>
    /// Notifi Server Name was updated
    /// </summary>
    public class ServerNameUpdatedNotifi : ServerBaseNotifi
    {
        public string Old_Name { get; set; }

        public string New_Name { get; set; }

        public ServerNameUpdatedNotifi(
            string server_guid,
            string old_name,
            string new_name
        )
            : base(server_guid)
        {
            Old_Name = old_name;
            New_Name = new_name;
        }
    }

    /// <summary>
    /// Command handler for user <c>ServerNameUpdatedNotifi</c>
    /// </summary>
    public class ServerNameUpdatedNotifi_Handler : INotificationHandler<ServerNameUpdatedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public ServerNameUpdatedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>ServerNameUpdatedNotifi</c>
        /// </summary>
        public Task Handle(ServerNameUpdatedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

}