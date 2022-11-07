using MediatR;
using Aplication.Core;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// ThrowErrorCommand
    /// </summary>
    public class ThrowErrorCommand : CommandBase<Unit>
    {

    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>ThrowErrorCommandHandler</c> command </summary>
    public class ThrowErrorCommandHandler : IRequestHandler<ThrowErrorCommand, Unit>
    {

        /// <summary>
        /// Main constructor
        /// </summary>
        public ThrowErrorCommandHandler()
        {

        }

        /// <summary>
        /// Command handler for <c>ThrowErrorCommand</c>
        /// </summary>
        public async Task<Unit> Handle(ThrowErrorCommand request, CancellationToken cancellationToken)
        {
            throw new Exception("Error");
        }
    }
}