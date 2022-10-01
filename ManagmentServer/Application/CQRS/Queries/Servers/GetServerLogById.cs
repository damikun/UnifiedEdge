using MediatR;
using AutoMapper;
using Persistence;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Server logs (from db)
    /// </summary>
    public class GetServerLogById
     : CommandBase<DTO_IServerEventLog>
    {
        public long Id { get; init; }

        public GetServerLogById(long id)
        {
            Id = id;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetServerLogById Field Validator
    /// </summary>
    public class GetServerLogByIdValidator
        : AbstractValidator<GetServerLogById>
    {
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public GetServerLogByIdValidator(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;

            RuleFor(e => e.Id)
            .NotEmpty()
            .NotNull()
            .MustAsync(Exist).WithMessage("ServerLog not found");
        }

        public async Task<bool> Exist(
            long id,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.ServerEvents
                .AnyAsync(e => e.ID == id, cancellationToken);
        }
    }

    /// <summary>
    /// GetServerLogById Field Authorization validator
    /// </summary>
    public class GetServerLogByIdAuthorizationValidator
        : AuthorizationValidator<GetServerLogById>
    {
        public GetServerLogByIdAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetServerLogById</c> command </summary>
    public class GetServerLogByIdHandler
        : IRequestHandler<GetServerLogById, DTO_IServerEventLog>
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
        public GetServerLogByIdHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;
        }

        /// <summary>
        /// Command handler for <c>GetServerLogById</c>
        /// </summary>
        public async Task<DTO_IServerEventLog> Handle(
            GetServerLogById request,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var db_event = await dbContext.ServerEvents
                .AsNoTracking()
                .Where(e => e.ID == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (db_event == null)
            {
                throw new Exception("Event not found");
            }

            return _mapper.Map<DTO_IServerEventLog>(db_event);
        }
    }
}