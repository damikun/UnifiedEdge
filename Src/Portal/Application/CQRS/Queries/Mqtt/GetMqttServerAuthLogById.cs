using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Aplication.Interfaces;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using Aplication.Services.ServerFascade;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server autentication log by Id
    /// </summary>
    public class GetMqttServerAuthLogById
        : CommandBase<DTO_MqttAuthLog>
    {

        public GetMqttServerAuthLogById()
        {

        }

        public GetMqttServerAuthLogById(long log_identifier)
        {
            log_id = log_identifier;
        }

#nullable disable
        public long log_id { get; set; }

#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerAuthLogById Field Validator
    /// </summary>
    public class GetMqttServerAuthLogByIdValidator
        : AbstractValidator<GetMqttServerAuthLogById>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx> </c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetMqttServerAuthLogByIdValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.log_id)
            .GreaterThan(0)
            .MustAsync(Exist)
            .WithMessage("Server not found");
        }

        public async Task<bool> Exist(
            long log_id,
            CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttAuthLogs
                .AnyAsync(e => e.Id == log_id);
        }
    }

    /// <summary>
    /// GetMqttServerAuthLogById Field Authorization validator
    /// </summary>
    public class GetMqttServerAuthLogByIdAuthorizationValidator
        : AuthorizationValidator<GetMqttServerAuthLogById>
    {
        public GetMqttServerAuthLogByIdAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerAuthLogById</c> command </summary>
    public class GetMqttServerAuthLogByIdHandler
        : IRequestHandler<GetMqttServerAuthLogById, DTO_MqttAuthLog>
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
        private readonly ICursorPagination<DTO_MqttAuthLog> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServerAuthLogByIdHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IServerFascade fascade,
            IMapper mapper,
            ICursorPagination<DTO_MqttAuthLog> cursor_provider)
        {
            _mapper = mapper;

            _factory = factory;

            _fascade = fascade;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerAuthLogById</c>
        /// </summary>
        public async Task<DTO_MqttAuthLog> Handle(
            GetMqttServerAuthLogById request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.MqttAuthLogs
            .AsNoTracking()
            .Where(e => e.Id == request.log_id)
            .ProjectTo<DTO_MqttAuthLog>(_mapper.ConfigurationProvider)
            .FirstAsync(cancellationToken);
        }
    }
}