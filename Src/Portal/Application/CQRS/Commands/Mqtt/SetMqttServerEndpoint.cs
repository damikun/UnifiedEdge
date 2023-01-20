using MediatR;
using System.Net;
using AutoMapper;
using Domain.Server;
using Server.Mqtt.DTO;
using Aplication.Core;
using FluentValidation;
using MediatR.Pipeline;
using Persistence.Portal;
using Aplication.Events.Server;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Aplication.Services.ServerFascade;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// SetMqttServerEndpoint
    /// </summary>
    [Authorize]
    public class SetMqttServerEndpoint
        : CommandBase<DTO_MqttServerEndpoint>
    {
#nullable disable
        public string Server_uid;

        public string Ip;

        public int Port;
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// Field validator - SetMqttServerEndpoint
    /// </summary>
    public class SetMqttServerEndpointValidator
        : AbstractValidator<SetMqttServerEndpoint>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        private readonly IEndpointProvider _e_provider;

        public SetMqttServerEndpointValidator(
            IDbContextFactory<ManagmentDbCtx> factory,
            IEndpointProvider e_provider
        )
        {
            _factory = factory;

            _e_provider = e_provider;

            ClassLevelCascadeMode = CascadeMode.Stop;

            RuleFor(e => e.Ip)
                .NotEmpty()
                .NotNull()
                .Must(isValidIp)
                .WithMessage("Cannot parse Ip address");

            RuleFor(e => e.Port)
                .NotNull()
                .GreaterThanOrEqualTo(EndpointProvider.GetPortRangeOrDefault().min)
                .LessThanOrEqualTo(EndpointProvider.GetPortRangeOrDefault().max);

            RuleFor(e => e.Server_uid)
                .NotEmpty()
                .NotNull()
                .MustAsync(Exist)
                .WithMessage("Server not found");

            RuleFor(e => e)
                .MustAsync(isUniqueuEndpointAsync)
                .WithMessage("Ip with port allready in use");
        }

        public async Task<bool> Exist(
             string Uid,
             CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
                .AnyAsync(e => e.UID == Uid);
        }

        public bool isValidIp(string Ip)
        {
            try
            {
                if (IPAddress.TryParse(Ip, out IPAddress? parsed))
                {
                    if (parsed != null)
                        return true;
                }
            }
            catch { }

            return false;
        }

        public async Task<bool> isUniqueuEndpointAsync(
            SetMqttServerEndpoint request,
            CancellationToken cancellationToken
        )
        {
            try
            {
                var ip = IPAddress.Parse(request.Ip);

                if (ip == null)
                    return false;

                var endpoint = new IPEndPoint(ip, request.Port);

                return !(await _e_provider.IsUsed(endpoint));
            }
            catch { }

            return false;
        }
    }

    /// <summary>
    /// Authorization validators - SetMqttServerEndpoint
    /// </summary>
    public class SetMqttServerEndpointAuthorizationValidator
        : AuthorizationValidator<SetMqttServerEndpoint>
    {
        public SetMqttServerEndpointAuthorizationValidator()
        {

        }
    }


    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>SetMqttServerEndpointHandler</c> command </summary>
    public class SetMqttServerEndpointHandler
        : IRequestHandler<SetMqttServerEndpoint, DTO_MqttServerEndpoint>
    {

        /// <summary>
        /// Injected <c>IMediator</c>
        /// </summary>
        private readonly IMediator _mediator;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IEndpointProvider</c>
        /// </summary>
        private readonly IEndpointProvider _endpoint_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public SetMqttServerEndpointHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            IMediator mediator,
            IEndpointProvider endpoint_provider
        )
        {
            _factory = factory;

            _mapper = mapper;

            _mediator = mediator;

            _endpoint_provider = endpoint_provider;
        }

        /// <summary>
        /// Command handler for <c>SetMqttServerEndpoint</c>
        /// </summary>
        public async Task<DTO_MqttServerEndpoint> Handle(
            SetMqttServerEndpoint request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server = await dbContext.Servers
                .Where(e => e.UID == request.Server_uid)
                .Include(e => e.Endpoints)
                .Include(e => e.Cfg)
                .FirstAsync(cancellationToken);

            if (server == null)
            {
                throw new Exception("Server was not found");
            }

            var default_e = server?.Endpoints.FirstOrDefault();

            IPAddress ip = IPAddress.Parse(request.Ip);

            if (default_e == null)
            {
                default_e = new ServerIPv4Endpoint()
                {
                    Id = 1,
                    IpAddress = ip?.ToString()!,
                    Port = request.Port
                };

                server?.Endpoints.Add(default_e);
            }
            else
            {
                default_e.IpAddress = ip.ToString();
                default_e.Port = request.Port;
            }

            server.Cfg.TimeStamp = DateTime.Now;

            await dbContext.SaveChangesAsync(cancellationToken);

            return new DTO_MqttServerEndpoint()
            {
                EndpointId = default_e.Id,
                IPAddress = default_e.IpAddress,
                Port = default_e.Port,
                ServerUid = request.Server_uid
            };

        }

    }

    //---------------------------------------
    //---------------------------------------


    public class SetMqttServerEndpoint_PostProcessor
        : IRequestPostProcessor<SetMqttServerEndpoint, DTO_MqttServerEndpoint>
    {
        /// <summary>
        /// Injected <c>IPublisher</c>
        /// </summary>
        private readonly Aplication.Services.IPublisher _publisher;

        public SetMqttServerEndpoint_PostProcessor(
            IMemoryCache cache,
            Aplication.Services.IPublisher publisher
        )
        {
            _publisher = publisher;
        }

        public async Task Process(
            SetMqttServerEndpoint request,
            DTO_MqttServerEndpoint response,
            CancellationToken cancellationToken
        )
        {
            await _publisher.Publish<ServerConfigChangedNotifi>(
                new ServerConfigChangedNotifi(request.Server_uid),
                Services.PublishStrategy.ParallelNoWait
            );
        }
    }

}