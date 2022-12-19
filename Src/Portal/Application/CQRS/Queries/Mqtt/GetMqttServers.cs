using MediatR;
using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Persistence.Portal;
using Aplication.Interfaces;
using Aplication.Core.Pagination;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using Microsoft.Extensions.Caching.Memory;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Servers (from db)
    /// </summary>
    public class GetMqttServers
        : CommandBase<DTO_Connection<DTO_MqttServer>>
    {
        public GetMqttServers(CursorArguments arguments)
        {
            Arguments = arguments;
        }

        public CursorArguments Arguments { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServers Field Validator
    /// </summary>
    public class GetMqttServersValidator
        : AbstractValidator<GetMqttServers>
    {
        public GetMqttServersValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// GetMqttServers Field Authorization validator
    /// </summary>
    public class GetMqttServersAuthorizationValidator
        : AuthorizationValidator<GetMqttServers>
    {
        public GetMqttServersAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServers</c> command </summary>
    public class GetMqttServersHandler
        : IRequestHandler<GetMqttServers, DTO_Connection<DTO_MqttServer>>
    {
        /// <summary>
        /// Injected <c>IDbContextFactory<ManagmentDbCtx></c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMemoryCache _cache;

        /// <summary>
        /// Injected <c>ICursorPagination</c>
        /// </summary>
        private readonly ICursorPagination<DTO_MqttServer> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetMqttServersHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<DTO_MqttServer> cursor_provider,
            IMemoryCache cache)
        {
            _cache = cache;

            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServers</c>
        /// </summary>
        public async Task<DTO_Connection<DTO_MqttServer>> Handle(
            GetMqttServers request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            // Yes we query all together and than convert to queribale..
            var servers = dbContext.Servers
                .AsNoTracking()
                .OfType<MqttServer>()
                .ProjectTo<DTO_MqttServer>(_mapper.ConfigurationProvider)
                .AsQueryable();

            var cursor_data = await _cursor_provider.ApplyQueriablePagination(
                servers.AsQueryable(),
                request.Arguments,
                (ct) => dbContext.Servers
                    .AsNoTracking()
                    .OfType<MqttServer>()
                    .CountAsync(cancellationToken),
                cancellationToken
            );

            return new DTO_Connection<DTO_MqttServer>()
            {
                edges = cursor_data.edges,
                pageInfo = cursor_data.pageInfo
            };
        }
    }
}