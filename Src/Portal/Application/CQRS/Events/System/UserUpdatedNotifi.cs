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
    public class UserUpdatedNotifi : BaseNotifi
    {
        public UserUpdatedNotifi(DTO_User user) : base()
        {
            ActivityId = Activity.Current?.Id;

            User = user;
        }

        public DTO_User User { get; set; }
    }

    /// <summary>
    /// Command handler for user <c>UserUpdatedNotifi</c>
    /// </summary>
    public class UserUpdatedNotifi_Handler : INotificationHandler<UserUpdatedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public UserUpdatedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>UserUpdatedNotifi</c>
        /// </summary>
        public Task Handle(UserUpdatedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

}