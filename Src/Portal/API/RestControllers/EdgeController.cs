using MediatR;
using Aplication.DTO;
using Aplication.CQRS.Queries;
using Microsoft.AspNetCore.Mvc;

namespace API
{
    public class EdgeController : PublicBaseController
    {
        public readonly IMediator _mediator;

        public EdgeController(
            IMediator mediator
        )
        {
            _mediator = mediator;
        }


        /// Process Start/Stop/Restart to any sserver by UID
        [HttpGet("")]
        [ProducesResponseType(typeof(DTO_Edge), 200)]
        public async Task<ActionResult<DTO_Edge>> Edge()
        {

            var response = await _mediator.Send(
                new GetEdgeInfo()
            );

            return Ok(response);
        }

        /// Returns current edge DateTime
        [HttpGet("[action]")]
        [ProducesResponseType(typeof(DateTime), 200)]
        public ActionResult<DateTime> DateTime() => Ok(System.DateTime.Now);

    }
}