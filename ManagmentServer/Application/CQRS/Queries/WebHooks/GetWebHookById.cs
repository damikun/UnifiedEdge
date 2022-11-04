using MediatR;
using AutoMapper;
using Persistence.Portal;
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
    public class GetWebHookById
        : CommandBase<DTO_WebHook>
    {
        public GetWebHookById(long id)
        {
            hook_id = id;
        }

        public long hook_id { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetWebHookById Validator
    /// </summary>
    public class GetWebHookByIdValidator
        : AbstractValidator<GetWebHookById>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetWebHookByIdValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.hook_id)
            .GreaterThan(0)
            .MustAsync(Exist).WithMessage("Server uid not found");
        }

        public async Task<bool> Exist(
            long Id,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.WebHooks
                .AnyAsync(e => e.Id == Id, cancellationToken);
        }
    }

    /// <summary>
    /// Authorization validator
    /// </summary>
    public class GetWebHookByIdAuthorizationValidator
        : AuthorizationValidator<GetWebHookById>
    {
        public GetWebHookByIdAuthorizationValidator() { }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetWebHookById</c> command </summary>
    public class GetWebHookByIdHandler
        : IRequestHandler<GetWebHookById, DTO_WebHook>
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
        public GetWebHookByIdHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper
        )
        {
            _mapper = mapper;

            _factory = factory;
        }

        /// <summary>
        /// Command handler for <c>GetWebHookById</c>
        /// </summary>
        public async Task<DTO_WebHook> Handle(
            GetWebHookById request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.WebHooks
            .AsNoTracking()
            .Where(e => e.Id == request.hook_id)
            .ProjectTo<DTO_WebHook>(_mapper.ConfigurationProvider)
            .FirstAsync(cancellationToken);
        }
    }
}