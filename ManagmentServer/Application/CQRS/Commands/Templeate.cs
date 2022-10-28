using MediatR;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Aplication.Services;
using Aplication.CQRS.Behaviours;

namespace Aplication.CQRS.Commands
{
    /// <summary>
    /// Templeate
    /// </summary>
    [Authorize]
    public class Templeate : CommandBase<Unit>
    {

        public Templeate()
        {

        }

    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Fiel validator - Templeate
    /// </summary>
    public class TempleateValidator : AbstractValidator<Templeate>
    {

        public TempleateValidator()
        {

        }

    }

    /// <summary>
    /// Authorization validators - Templeate
    /// </summary>
    public class TempleateAuthorizationValidator : AuthorizationValidator<Templeate>
    {
        public TempleateAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>CreateWebHook</c> command </summary>
    public class TempleateHandler : IRequestHandler<Templeate, Unit>
    {

        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current;

        /// <summary>
        /// Main constructor
        /// </summary>
        public TempleateHandler(ICurrentUser currentuser)
        {
            _current = currentuser;
        }

        /// <summary>
        /// Command handler for <c>Templeate</c>
        /// </summary>
        public async Task<Unit> Handle(Templeate request, CancellationToken cancellationToken)
        {
            return Unit.Value;
        }
    }

    //---------------------------------------
    //---------------------------------------

    public class TempleatePostProcessor
        : IRequestPostProcessor<Templeate, Unit>
    {


        public TempleatePostProcessor()
        {

        }

        public async Task Process(
            Templeate request,
            Unit response,
            CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
        }
    }
}