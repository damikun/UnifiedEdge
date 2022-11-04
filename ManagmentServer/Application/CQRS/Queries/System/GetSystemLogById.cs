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
    /// Query System log by Id (from db)
    /// </summary>
    public class GetSystemLogById
     : CommandBase<DTO_SystemEvent>
    {
        public long Log_id { get; set; }

        public GetSystemLogById(long log_id)
        {
            Log_id = log_id;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetSystemLogById Field Validator
    /// </summary>
    public class GetSystemLogByIdValidator
        : AbstractValidator<GetSystemLogById>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetSystemLogByIdValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.Log_id)
            .GreaterThan(0)
            .MustAsync(Exist).WithMessage("ServerLog not found");
        }

        public async Task<bool> Exist(
            long id,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.SystemEvents
                .AnyAsync(e => e.ID == id, cancellationToken);
        }
    }

    /// <summary>
    /// GetSystemLogById Field Authorization validator
    /// </summary>
    public class GetSystemLogByIdAuthorizationValidator
        : AuthorizationValidator<GetSystemLogById>
    {
        public GetSystemLogByIdAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetSystemLogById</c> command </summary>
    public class GetSystemLogByIdHandler
        : IRequestHandler<GetSystemLogById, DTO_SystemEvent>
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
        public GetSystemLogByIdHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;
        }

        /// <summary>
        /// Command handler for <c>GetSystemLogById</c>
        /// </summary>
        public async Task<DTO_SystemEvent> Handle(
            GetSystemLogById request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var log = await dbContext.SystemEvents
                .AsNoTracking()
                .Where(e => e.ID == request.Log_id)
                .ProjectTo<DTO_SystemEvent>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(cancellationToken);

            if (log == null)
            {
                throw new Exception("Log not found");
            }

            return log;
        }
    }
}