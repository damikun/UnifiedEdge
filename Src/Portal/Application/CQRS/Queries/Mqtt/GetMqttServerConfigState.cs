using MediatR;
using AutoMapper;
using Aplication.Core;
using FluentValidation;
using Aplication.Services;
using Aplication.CQRS.Behaviours;
using Aplication.Services.ServerFascade;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server by id (guid)
    /// </summary>
    public class GetMqttServerConfigState : CommandBase<bool>
    {
#nullable disable
        public string Guid { get; set; }
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerConfigState Field Validator
    /// </summary>
    public class GetMqttServerConfigStateValidator : AbstractValidator<GetMqttServerConfigState>
    {
        public GetMqttServerConfigStateValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// GetMqttServerConfigState Field Authorization validator
    /// </summary>
    public class GetMqttServerConfigStateAuthorizationValidator : AuthorizationValidator<GetMqttServerConfigState>
    {
        public GetMqttServerConfigStateAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerConfigState</c> command </summary>
    public class GetMqttServerConfigStateHandler : IRequestHandler<GetMqttServerConfigState, bool>
    {
        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current;

        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerConfigStateHandler(
            IServerFascade fascade,
            ICurrentUser currentuser,
            IMapper mapper)
        {
            _mapper = mapper;

            _fascade = fascade;

            _current = currentuser;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerConfigState</c>
        /// </summary>
        public async Task<bool> Handle(
            GetMqttServerConfigState request, CancellationToken cancellationToken)
        {
            return await _fascade.IsConfigMatch(request.Guid);
        }
    }
}