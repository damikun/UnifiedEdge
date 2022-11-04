using MediatR;
using Aplication.DTO;
using Aplication.Core;
using System.Diagnostics;
using Microsoft.Extensions.Logging;

namespace Aplication.Events.Server
{
    /// <summary>
    /// Notifi Server was created
    /// </summary>
    public class UserRemovedNotifi : BaseNotifi
    {
        public UserRemovedNotifi(DTO_User user) : base()
        {
            ActivityId = Activity.Current?.Id;

            User = user;
        }

        public DTO_User User { get; set; }
    }

    /// <summary>
    /// Command handler for user <c>UserRemovedNotifi</c>
    /// </summary>
    public class UserRemovedNotifi_Handler : INotificationHandler<UserRemovedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public UserRemovedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>UserRemovedNotifi</c>
        /// </summary>
        public Task Handle(UserRemovedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

}