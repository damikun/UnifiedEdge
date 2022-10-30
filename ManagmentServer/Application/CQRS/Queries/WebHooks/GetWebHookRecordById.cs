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
    /// Query webhook record by Id
    /// </summary>
    public class GetWebHookRecordById
        : CommandBase<DTO_WebHookRecord>
    {
        public GetWebHookRecordById(long id)
        {
            record_id = id;
        }

        public long record_id { get; init; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetWebHookRecordById Validator
    /// </summary>
    public class GetWebHookRecordByIdValidator
        : AbstractValidator<GetWebHookRecordById>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetWebHookRecordByIdValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.record_id)
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

            return await dbContext.WebHooksHistory
                .AnyAsync(e => e.Id == Id, cancellationToken);
        }
    }

    /// <summary>
    /// Authorization validator
    /// </summary>
    public class GetWebHookRecordByIdAuthorizationValidator
        : AuthorizationValidator<GetWebHookRecordById>
    {
        public GetWebHookRecordByIdAuthorizationValidator() { }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetWebHookRecordById</c> command </summary>
    public class GetWebHookRecordByIdHandler
        : IRequestHandler<GetWebHookRecordById, DTO_WebHookRecord>
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
        public GetWebHookRecordByIdHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper
        )
        {
            _mapper = mapper;

            _factory = factory;
        }

        /// <summary>
        /// Command handler for <c>GetWebHookRecordById</c>
        /// </summary>
        public async Task<DTO_WebHookRecord> Handle(
            GetWebHookRecordById request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.WebHooksHistory
            .AsNoTracking()
            .Where(e => e.Id == request.record_id)
            .ProjectTo<DTO_WebHookRecord>(_mapper.ConfigurationProvider)
            .FirstAsync(cancellationToken);
        }
    }
}