using Server;
using MediatR;
using AutoMapper;
using Aplication.Core;
using Server.Manager.Mqtt;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// CleanMqttStoredMessages
    /// </summary>
    public class CleanOldMqttStoredMessages : CommandBase<Unit>
    {
        public CleanOldMqttStoredMessages()
        {
            this.Flags.diable_tracing = true;
            this.Flags.long_running = true;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>CleanMqttStoredMessagesHandler</c> command </summary>
    public class CleanMqttStoredMessagesHandler : IRequestHandler<CleanOldMqttStoredMessages, Unit>
    {

        /// <summary>
        /// Injected <c>IMediator</c>
        /// </summary>
        private readonly IMediator _mediator;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>IMqttServerManager</c>
        /// </summary>
        private readonly IMqttServerManager _manager;

        public const int MAX_NUMBER_OF_EVENTS = 100;

        /// <summary>
        /// Main constructor
        /// </summary>
        public CleanMqttStoredMessagesHandler(
            IMapper mapper,
            IMediator mediator,
            IServerEventPublisher server_e_publisher,
            IMqttServerManager manager
        )
        {
            _mapper = mapper;

            _mediator = mediator;

            _manager = manager;
        }

        /// <summary>
        /// Command handler for <c>CleanMqttStoredMessages</c>
        /// </summary>
        public async Task<Unit> Handle(
            CleanOldMqttStoredMessages request,
            CancellationToken cancellationToken
        )
        {
            var server_ids = await _manager.GetManagedServerIds();

            foreach (var server_id in server_ids)
            {
                try
                {
                    await _manager.CleanOldMessages(server_id);
                }
                catch { }

            }

            return Unit.Value;
        }
    }
}