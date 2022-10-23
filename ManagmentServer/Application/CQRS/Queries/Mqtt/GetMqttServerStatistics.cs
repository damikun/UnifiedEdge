using MediatR;
using AutoMapper;
using Persistence;
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
    /// Query Mqtt Server endpoint
    /// </summary>
    public class GetMqttServerStatistics
        : CommandBase<DTO_MqttServerStats?>
    {

#nullable disable
        public string server_uid { get; set; }

#nullable enable

        public GetMqttServerStatistics(string _server_uid)
        {
            server_uid = _server_uid;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerStatistics Field Validator
    /// </summary>
    public class GetMqttServerStatisticsValidator
        : AbstractValidator<GetMqttServerStatistics>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerStatisticsValidator(IServerFascade fascade)
        {
            _fascade = fascade;

            RuleFor(e => e.server_uid)
            .NotNull()
            .NotEmpty()
            .MustAsync(Exist).WithMessage("Server not found");
        }

        public async Task<bool> Exist(
            string server_uid,
            CancellationToken cancellationToken)
        {
            return await _fascade.Contains(server_uid);
        }
    }

    /// <summary>
    /// GetMqttServerStatistics Field Authorization validator
    /// </summary>
    public class GetMqttServerStatisticsAuthorizationValidator
        : AuthorizationValidator<GetMqttServerStatistics>
    {
        public GetMqttServerStatisticsAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerStatistics</c> command </summary>
    public class GetMqttServerStatisticsHandler
        : IRequestHandler<GetMqttServerStatistics, DTO_MqttServerStats?>
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
        /// Injected <c>IMqttServerManager</c>
        /// </summary>
        private readonly IMqttServerManager _manager;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerStatisticsHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper,
            IMqttServerManager manager)
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;

            _manager = manager;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerStatistics</c>
        /// </summary>
        public async Task<DTO_MqttServerStats?> Handle(
            GetMqttServerStatistics request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await _manager.GetServerStatistics(request.server_uid);
        }
    }
}