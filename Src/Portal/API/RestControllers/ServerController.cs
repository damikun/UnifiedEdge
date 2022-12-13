using MediatR;
using Aplication.DTO;
using Server.Mqtt.DTO;
using Aplication.Interfaces;
using Aplication.CQRS.Queries;
using Microsoft.AspNetCore.Mvc;
using Aplication.Core.Pagination;


namespace API
{

    public class ServerController : PublicBaseController
    {
        public readonly IMediator _mediator;

        public ServerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// Returns connection of Servers as union IServer
        [HttpGet()]
        [ProducesResponseType(typeof(DTO_Connection<IServer>), 200)]
        public async Task<ActionResult<DTO_Connection<IServer>>> GetServers(
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
        public async Task<ActionResult<DTO_MqttClient>> GetMqttServerClients(
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
    }
}