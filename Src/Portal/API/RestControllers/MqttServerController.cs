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

        /// Returns mqtt server instance log
        [HttpGet("{server_uid}/Clients/{client_uid}")]
        [ProducesResponseType(typeof(DTO_MqttClient), 200)]
        public async Task<ActionResult<DTO_MqttClient?>> ClientByUid(
            [FromRoute] string server_uid,
            [FromRoute] string client_uid
        )
        {
            var response = await _mediator.Send(
                new GetMqttServerClientById(
                    server_uid,
                    client_uid
                )
            );

            return Ok(response);
        }

        /// Returns mqtt server isntance logs connection
        [HttpGet("{server_uid}/[action]")]
        [ProducesResponseType(typeof(DTO_Connection<DTO_MqttServerLog>), 200)]
        public async Task<ActionResult<DTO_Connection<DTO_MqttServerLog>?>> InstanceLogs(
            [FromRoute] string server_uid,
            [FromQuery] int? first = null,
            [FromQuery] int? last = null,
            [FromQuery] string? after = null,
            [FromQuery] string? before = null
        )
        {
            var response = await _mediator.Send(
                new GetMqttServerLogs(
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

        /// Returns mqtt server instance log
        [HttpGet("{server_uid}/InstanceLogs/{log_uid}")]
        [ProducesResponseType(typeof(DTO_MqttServerLog), 200)]
        public async Task<ActionResult<DTO_MqttServerLog?>> InstanceLogByUid(
            [FromRoute] string server_uid,
            [FromRoute] string log_uid
        )
        {
            var response = await _mediator.Send(
                new GetMqttServerLogById(
                    server_uid,
                    log_uid
                )
            );

            return Ok(response);
        }

        /// Returns mqtt server aplication logs connection
        [HttpGet("{server_uid}/[action]")]
        [ProducesResponseType(typeof(DTO_Connection<DTO_IServerEventLog>), 200)]
        public async Task<ActionResult<DTO_Connection<DTO_IServerEventLog>?>> AplicationLogs(
            [FromRoute] string server_uid,
            [FromQuery] int? first = null,
            [FromQuery] int? last = null,
            [FromQuery] string? after = null,
            [FromQuery] string? before = null
        )
        {
            var response = await _mediator.Send(
                new GetServerLogs(
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

        /// Returns mqtt server log
        [HttpGet("{server_uid}/AplicationLogs/{log_uid}")]
        [ProducesResponseType(typeof(DTO_IServerEventLog), 200)]
        public async Task<ActionResult<DTO_IServerEventLog>?> ApplictaionLogByUid(
            [FromRoute] string server_uid,
            [FromRoute] long log_uid
        )
        {
            var response = await _mediator.Send(
                new GetServerLogById(
                    log_uid
                )
            );

            return Ok(response);
        }


        /// Returns mqtt server aplication authentication logs connection
        [HttpGet("{server_uid}/[action]")]
        [ProducesResponseType(typeof(DTO_Connection<DTO_MqttAuthLog>), 200)]
        public async Task<ActionResult<DTO_Connection<DTO_MqttAuthLog>?>> AuthLogs(
            [FromRoute] string server_uid,
            [FromQuery] int? first = null,
            [FromQuery] int? last = null,
            [FromQuery] string? after = null,
            [FromQuery] string? before = null
        )
        {
            var response = await _mediator.Send(
                new GetMqttServerAuthLogs(
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


        /// Returns mqtt server aplication authentication log
        [HttpGet("{server_uid}/AuthLogs/{log_uid}")]
        [ProducesResponseType(typeof(DTO_MqttAuthLog), 200)]
        public async Task<ActionResult<DTO_MqttAuthLog?>> AuthLogByUid(
                [FromRoute] string server_uid,
                [FromRoute] long log_uid
            )
        {
            var response = await _mediator.Send(
                new GetMqttServerAuthLogById(
                    log_uid
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

        /// Returns mqtt server recent message
        [HttpGet("{server_uid}/RecentMessages/{message_uid}")]
        [ProducesResponseType(typeof(DTO_Connection<DTO_MqttMessage>), 200)]
        public async Task<ActionResult<DTO_Connection<DTO_MqttMessage>?>> RecentMessageByUid(
            [FromRoute] string server_uid,
            [FromRoute] string message_uid
        )
        {
            var response = await _mediator.Send(
                new GetMqttServerMessageById(
                    server_uid,
                    message_uid
                )
            );

            return Ok(response);
        }
    }
}