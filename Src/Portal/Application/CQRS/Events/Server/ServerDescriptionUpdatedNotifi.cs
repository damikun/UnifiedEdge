using MediatR;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.Server
{
    /// <summary>
    /// Notifi Server Description was updated
    /// </summary>
    public class ServerDescriptionUpdatedNotifi
        : ServerBaseNotifi
    {
        public string Old_Description { get; set; }

        public string New_Description { get; set; }

        public ServerDescriptionUpdatedNotifi(
            string server_guid,
            string old_Description,
            string new_Description
        )
            : base(server_guid)
        {
            Old_Description = old_Description;
            New_Description = new_Description;
        }
    }

    /// <summary>
    /// Command handler for user <c>ServerDescriptionUpdatedNotifi</c>
    /// </summary>
    public class ServerDescriptionUpdatedNotifi_Handler
        : INotificationHandler<ServerDescriptionUpdatedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public ServerDescriptionUpdatedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>ServerDescriptionUpdatedNotifi</c>
        /// </summary>
        public Task Handle(
            ServerDescriptionUpdatedNotifi request,
            CancellationToken cancellationToken
        )
        {
            return Task.CompletedTask;
        }
    }

}