using MediatR;
using Aplication.DTO;
using Server.Mqtt.DTO;
using Aplication.CQRS.Queries;
using Microsoft.AspNetCore.Mvc;
using Aplication.Core.Pagination;


namespace API
{
    public class MqttServersController : PublicBaseController
    {
        public readonly IMediator _mediator;

        public MqttServersController(
            IMediator mediator
        )
        {
            _mediator = mediator;
        }

        /// Returns connection of MqttServers
        [HttpGet("")]
        [ProducesResponseType(typeof(DTO_Connection<DTO_MqttServer>), 200)]
        public async Task<ActionResult<DTO_Connection<DTO_MqttServer>>> Servers(
            [FromQuery] int? first = null,
            [FromQuery] int? last = null,
            [FromQuery] string? after = null,
            [FromQuery] string? before = null
        )
        {
            var response = await _mediator.Send(
                new GetMqttServers(
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
        [HttpGet("{server_uid}")]
        [ProducesResponseType(typeof(DTO_MqttServer), 200)]
        public async Task<ActionResult<DTO_MqttServer>> Server(
            [FromRoute] string server_uid
        )
        {
            var response = await _mediator.Send(
                new GetMqttServerByGuid()
                {
                    Guid = server_uid
                }
            );

            return Ok(response);
        }

        /// Returns mqtt server clinets connection
        [HttpGet("{server_uid}/[action]")]
        [ProducesResponseType(typeof(DTO_Connection<DTO_MqttClient>), 200)]
        public async Task<ActionResult<DTO_Connection<DTO_MqttClient>?>> Clients(
            [FromRoute] string server_uid,
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
        [HttpGet("{server_uid}/[action]")]
        [ProducesResponseType(typeof(DTO_MqttServerEndpoint), 200)]
        public async Task<ActionResult<DTO_MqttServerEndpoint>> Endpoint(
            [FromRoute] string server_uid
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
        [HttpGet("{server_uid}/[action]")]
        [ProducesResponseType(typeof(DTO_Connection<DTO_MqttMessage>), 200)]
        public async Task<ActionResult<DTO_Connection<DTO_MqttMessage>>> RecentMessages(
            [FromRoute] string server_uid,
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
    }
}