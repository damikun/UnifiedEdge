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
    public class UserCreatedNotifi : BaseNotifi
    {
        public UserCreatedNotifi(DTO_User user) : base()
        {
            ActivityId = Activity.Current?.Id;

            User = user;
        }

        public DTO_User User { get; set; }
    }

    /// <summary>
    /// Command handler for user <c>UserCreatedNotifi</c>
    /// </summary>
    public class UserCreatedNotifi_Handler : INotificationHandler<UserCreatedNotifi>
    {

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _logger;

        public UserCreatedNotifi_Handler(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Command handler for <c>UserCreatedNotifi</c>
        /// </summary>
        public Task Handle(UserCreatedNotifi request, CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }

}