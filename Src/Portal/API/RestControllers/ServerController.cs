using Server;
using MediatR;
using Aplication.DTO;
using Server.Mqtt.DTO;
using Aplication.CQRS.Queries;
using Microsoft.AspNetCore.Mvc;
using Aplication.CQRS.Commands;
using Aplication.Core.Pagination;
using Duende.IdentityServer.Stores;
using Duende.IdentityServer.Services;
using Microsoft.AspNetCore.Authorization;


namespace API
{

    public class ServerController : PublicBaseController
    {
        public readonly IMediator _mediator;

        public readonly IPersistedGrantStore _store;

        private readonly IIssuerNameService _issuerNameService;

        private readonly ITokenService _tokenService;

        public ServerController(
            IMediator mediator,
            IPersistedGrantStore store,
            IIssuerNameService issuerNameService,
            ITokenService tokenService
        )
        {
            _mediator = mediator;

            _store = store;

            _tokenService = tokenService;

            _issuerNameService = issuerNameService;
        }


        [HttpGet()]
        [ProducesResponseType(typeof(string), 200)]
        public async Task<ActionResult<List<Duende.IdentityServer.Models.PersistedGrant>>> PrintTokens()
        {

            var result = await _store.GetAllAsync(new PersistedGrantFilter()
            {
                SubjectId = "8be47ae3-dabd-4069-ac23-80b3485356fe"
            });


            return Ok(result.ToList());
        }

        [HttpGet()]
        [ProducesResponseType(typeof(DTO_Token), 200)]
        public async Task<ActionResult<DTO_Token>> GetToken(
            [FromQuery] string description,
            [FromQuery] TokenSkope scope,
            [FromQuery] TokenLifetime lifetime
        )
        {
            var response = await _mediator.Send(
                new GetApiToken()
                {
                    Description = description,
                    Scope = scope,
                    Lifetime = lifetime
                }
            );

            return Ok(response);
        }

        /// Returns connection of Servers as union IServer
        [HttpGet()]
        [ProducesResponseType(typeof(DTO_Connection<Aplication.Interfaces.IServer>), 200)]
        public async Task<ActionResult<DTO_Connection<Aplication.Interfaces.IServer>>> GetServers(
            [FromQuery] int? first = null,
            [FromQuery] int? last = null,
            [FromQuery] string? after = null,
            [FromQuery] string? before = null
        )
        {
            var response = await _mediator.Send(
                new GetServers(
                    new CursorArguments(
                        first: first,
                        last: last,
                        after: after,
                        before: before
                    ))
                );

            return Ok(response);
        }

        /// Returns mqtt server by UID
        [HttpGet()]
        [ProducesResponseType(typeof(DTO_MqttServer), 200)]
        public async Task<ActionResult<DTO_MqttServer>> GetMqttServerByUid(
            [FromQuery] string uid
        )
        {
            var response = await _mediator.Send(
                new GetMqttServerByGuid()
                {
                    Guid = uid
                }
            );

            return Ok(response);
        }

        /// Returns mqtt server clinets connection
        [HttpGet()]
        [ProducesResponseType(typeof(DTO_Connection<DTO_MqttClient>), 200)]
        public async Task<ActionResult<DTO_Connection<DTO_MqttClient>?>> GetMqttServerClients(
            [FromQuery] string server_uid,
            [FromQuery] int? first = null,
            [FromQuery] int? last = null,
            [FromQuery] string? after = null,
            [FromQuery] string? before = null
        )
        {
            var response = await _mediator.Send(
                new GetMqttServerClients(
                    new CursorArguments(
                        first: first,
                        last: last,
                        after: after,
                        before: before
                    ),
                    server_uid
                )
            );

            return Ok(response);
        }

        /// Returns mqtt server endpoint
        [HttpGet()]
        [ProducesResponseType(typeof(DTO_MqttServerEndpoint), 200)]
        public async Task<ActionResult<DTO_MqttServerEndpoint>> GetMqttServerEndpoint(
            [FromQuery] string server_uid
        )
        {
            var response = await _mediator.Send(
                new GetMqttServerEndpoint(
                    server_uid
                )
            );

            return Ok(response);
        }

        /// Returns mqtt server recent messages
        [HttpGet()]
        [ProducesResponseType(typeof(DTO_Connection<DTO_MqttMessage>), 200)]
        public async Task<ActionResult<DTO_Connection<DTO_MqttMessage>>> GetMqttServerRecentMessages(
            [FromQuery] string server_uid,
            [FromQuery] int? first = null,
            [FromQuery] int? last = null,
            [FromQuery] string? after = null,
            [FromQuery] string? before = null,
            [FromQuery] string? filter_client_uid = null,
            [FromQuery] string? filter_topic_uid = null
        )
        {
            var response = await _mediator.Send(
                new GetMqttServerRecentMessages(
                     new CursorArguments(
                        first: first,
                        last: last,
                        after: after,
                        before: before
                    ),
                    server_uid,
                    filter_client_uid,
                    filter_topic_uid
                )
            );

            return Ok(response);
        }


        // Process Start/Stop/Restart to any sserver by UID
        [HttpPost()]
        [Authorize(Policy = "write_access")]
        [ProducesResponseType(typeof(ServerState), 200)]
        public async Task<ActionResult<ServerState>> ProcessServerCmd(
            string server_uid,
            ServerCmd command,
            [FromServices] IHttpContextAccessor context
        )
        {

            var response = await _mediator.Send(
                new ProcessServerCmd()
                {
                    UID = server_uid,
                    Command = command
                }
            );

            return Ok(response);
        }
    }
}