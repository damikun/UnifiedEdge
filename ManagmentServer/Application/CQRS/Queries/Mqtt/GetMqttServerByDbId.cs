using MediatR;
using AutoMapper;
using Persistence;
using Aplication.DTO;
using Aplication.Core;
using FluentValidation;
using Aplication.Services;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server by id (guid)
    /// </summary>
    public class GetMqttServerByDbId : CommandBase<DTO_MqttServer>
    {
        public long Id { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerByDbId Field Validator
    /// </summary>
    public class GetMqttServerByDbIdValidator : AbstractValidator<GetMqttServerByDbId>
    {
        public GetMqttServerByDbIdValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// GetMqttServerByDbId Field Authorization validator
    /// </summary>
    public class GetMqttServerByDbIdAuthorizationValidator : AuthorizationValidator<GetMqttServerByDbId>
    {
        public GetMqttServerByDbIdAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerByDbId</c> command </summary>
    public class GetMqttServerByDbIdHandler : IRequestHandler<GetMqttServerByDbId, DTO_MqttServer>
    {
        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current;

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
        public GetMqttServerByDbIdHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            ICurrentUser currentuser,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;

            _current = currentuser;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerByDbId</c>
        /// </summary>
        public async Task<DTO_MqttServer> Handle(
            GetMqttServerByDbId request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var query = dbContext.Servers
                .AsNoTracking()
                .Where(e => e.ID == request.Id)
                .ProjectTo<DTO_MqttServer>(_mapper.ConfigurationProvider)
                .AsQueryable();

            var result = await query.FirstOrDefaultAsync(cancellationToken);

            if (result == null)
            {
                throw new Exception("Not Found");
            }

            return result;
        }
    }
}