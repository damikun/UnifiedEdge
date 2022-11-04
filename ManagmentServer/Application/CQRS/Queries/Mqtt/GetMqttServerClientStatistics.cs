using MediatR;
using AutoMapper;
using Persistence.Portal;
using Server.Mqtt.DTO;
using Aplication.Core;
using FluentValidation;
using Server.Manager.Mqtt;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server client statistics
    /// </summary>
    public class GetMqttServerClientStatistics
        : CommandBase<DTO_MqttClientStatistics?>
    {

#nullable disable
        public string server_uid { get; set; }

        public string server_client_uid { get; set; }
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerClientStatistics Field Validator
    /// </summary>
    public class GetMqttServerClientStatisticsValidator
        : AbstractValidator<GetMqttServerClientStatistics>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerClientStatisticsValidator(IServerFascade fascade)
        {
            _fascade = fascade;

            RuleFor(e => e.server_uid)
            .NotNull()
            .NotEmpty()
            .MustAsync(Exist).WithMessage("Server not found");

            RuleFor(e => e.server_uid)
            .NotNull()
            .NotEmpty();
            // .MustAsync(Exist).WithMessage("Server client not found");
        }

        public async Task<bool> Exist(
            string server_uid,
            CancellationToken cancellationToken)
        {
            return await _fascade.Contains(server_uid);
        }
    }

    /// <summary>
    /// GetMqttServerClientStatistics Field Authorization validator
    /// </summary>
    public class GetMqttServerClientStatisticsAuthorizationValidator
        : AuthorizationValidator<GetMqttServerClientStatistics>
    {
        public GetMqttServerClientStatisticsAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerClientStatistics</c> command </summary>
    public class GetMqttServerClientStatisticsHandler
        : IRequestHandler<GetMqttServerClientStatistics, DTO_MqttClientStatistics?>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx></c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerClientStatisticsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerClientStatistics</c>
        /// </summary>
        public async Task<DTO_MqttClientStatistics?> Handle(
            GetMqttServerClientStatistics request, CancellationToken cancellationToken)
        {
            IMqttServerManager manager = (IMqttServerManager)await _fascade.GetManager(request.server_uid);

            return await manager.GetClientStatistics(request.server_uid, request.server_client_uid);
        }
    }
}