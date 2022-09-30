using MediatR;
using AutoMapper;
using Persistence;
using Aplication.Core;
using FluentValidation;
using Aplication.Interfaces;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server (from db)
    /// </summary>
    public class GetServer
        : CommandBase<IServer>
    {
        public string Guid { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetServer Field Validator
    /// </summary>
    public class GetServerValidator
        : AbstractValidator<GetServer>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetServerValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.Guid)
            .NotEmpty()
            .NotNull()
            .MustAsync(Exist).WithMessage("Server uid not found");
        }

        public async Task<bool> Exist(
            string uid,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.Servers
                .AnyAsync(e => e.UID == uid, cancellationToken);
        }
    }

    /// <summary>
    /// GetServer Field Authorization validator
    /// </summary>
    public class GetServerAuthorizationValidator
        : AuthorizationValidator<GetServer>
    {
        public GetServerAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetServer</c> command </summary>
    public class GetServerHandler
        : IRequestHandler<GetServer, IServer>
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
        private readonly ICursorPagination<IServer> _cursor_provider;

        /// <summary>
        /// Main constructor
        /// </summary>
        public GetServerHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            ICursorPagination<IServer> cursor_provider,
            IMemoryCache cache)
        {
            _cache = cache;

            _mapper = mapper;

            _factory = factory;

            _cursor_provider = cursor_provider;
        }

        /// <summary>
        /// Command handler for <c>GetServer</c>
        /// </summary>
        public async Task<IServer> Handle(
            GetServer request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var server = await dbContext.Servers
                .Where(e => e.UID == request.Guid)
                .AsNoTracking()
                .ToListAsync();

            return _mapper.Map<IServer>(server);
        }
    }
}