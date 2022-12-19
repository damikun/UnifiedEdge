using Server;
using MediatR;
using Aplication.DTO;
using Aplication.CQRS.Queries;
using Microsoft.AspNetCore.Mvc;
using Aplication.CQRS.Commands;
using Aplication.Core.Pagination;
using Microsoft.AspNetCore.Authorization;


namespace API
{
    public class ServersController : PublicBaseController
    {
        public readonly IMediator _mediator;

        public ServersController(
            IMediator mediator
        )
        {
            _mediator = mediator;
        }


        /// Returns connection of Servers as union IServer
        [HttpGet("")]
        [ProducesResponseType(typeof(DTO_Connection<Aplication.Interfaces.IServer>), 200)]
        public async Task<ActionResult<DTO_Connection<Aplication.Interfaces.IServer>>> Servers(
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

        // Process Start/Stop/Restart to any sserver by UID
        [HttpGet("{server_uid}/[action]")]
        [Authorize(Policy = "write_access")]
        [ProducesResponseType(typeof(ServerState), 200)]
        public async Task<ActionResult<ServerState>> ProcessCmd(
            [FromRoute] string server_uid,
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