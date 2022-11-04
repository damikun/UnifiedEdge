
using MediatR;
using AutoMapper;
using System.Net;
using Persistence.Portal;
using Server.Mqtt.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.Interfaces;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server endpoint
    /// </summary>
    public class GetMqttServerEndpoint
        : CommandBase<DTO_MqttServerEndpoint?>
    {

#nullable disable
        public string server_uid { get; set; }

#nullable enable

        public GetMqttServerEndpoint(string _server_uid)
        {
            server_uid = _server_uid;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerEndpoint Field Validator
    /// </summary>
    public class GetMqttServerEndpointValidator
        : AbstractValidator<GetMqttServerEndpoint>
    {
        /// <summary>
        /// Injected <c>IServerFascade</c>
        /// </summary>
        private readonly IServerFascade _fascade;

        public GetMqttServerEndpointValidator(IServerFascade fascade)
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
    /// GetMqttServerEndpoint Field Authorization validator
    /// </summary>
    public class GetMqttServerEndpointAuthorizationValidator
        : AuthorizationValidator<GetMqttServerEndpoint>
    {
        public GetMqttServerEndpointAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerEndpoint</c> command </summary>
    public class GetMqttServerEndpointHandler
        : IRequestHandler<GetMqttServerEndpoint, DTO_MqttServerEndpoint?>
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
        /// Injected <c>ICursorPagination</c>
        /// </summary>
        private readonly ICursorPagination<DTO_MqttServerEndpoint?> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerEndpointHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper,
            ICursorPagination<DTO_MqttServerEndpoint?> cursor_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerEndpoint</c>
        /// </summary>
        public async Task<DTO_MqttServerEndpoint?> Handle(
            GetMqttServerEndpoint request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server = await dbContext.Servers
                .AsNoTracking()
                .Where(e => e.UID == request.server_uid)
                .Include(e => e.Endpoints)
                .FirstAsync(cancellationToken);

            var endpoint = server.Endpoints.Select(e => new DTO_MqttServerEndpoint()
            {
                EndpointId = e.Id,
                IPAddress = e.IpAddress,
                Port = e.Port,
                ServerUid = server.UID
            }).FirstOrDefault();

            return endpoint;
        }
    }
}