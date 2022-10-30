using MediatR;
using AutoMapper;
using Persistence;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;


namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query webhook by Id
    /// </summary>
    public class GetWebHookByUid
        : CommandBase<DTO_WebHook>
    {
        public GetWebHookByUid(string uid)
        {
            hook_uid = uid;
        }

        public string hook_uid { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetWebHookByUid Validator
    /// </summary>
    public class GetWebHookByUidValidator
        : AbstractValidator<GetWebHookByUid>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetWebHookByUidValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.hook_uid)
            .NotNull()
            .NotEmpty()
            .MustAsync(Exist).WithMessage("Server uid not found");
        }

        public async Task<bool> Exist(
            string uid,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.WebHooks
                .AnyAsync(e => e.Uid == uid, cancellationToken);
        }
    }

    /// <summary>
    /// Authorization validator
    /// </summary>
    public class GetWebHookByUidAuthorizationValidator
        : AuthorizationValidator<GetWebHookByUid>
    {
        public GetWebHookByUidAuthorizationValidator() { }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetWebHookByUid</c> command </summary>
    public class GetWebHookByUidHandler
        : IRequestHandler<GetWebHookByUid, DTO_WebHook>
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
        /// Main constructor
        /// </summary>
        public GetWebHookByUidHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper
        )
        {
            _mapper = mapper;

            _factory = factory;
        }

        /// <summary>
        /// Command handler for <c>GetWebHookByUid</c>
        /// </summary>
        public async Task<DTO_WebHook> Handle(
            GetWebHookByUid request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var uid = request.hook_uid.ToLowerInvariant();

            return await dbContext.WebHooks
            .AsNoTracking()
            .Where(e => e.Uid == uid)
            .ProjectTo<DTO_WebHook>(_mapper.ConfigurationProvider)
            .FirstAsync(cancellationToken);
        }
    }
}