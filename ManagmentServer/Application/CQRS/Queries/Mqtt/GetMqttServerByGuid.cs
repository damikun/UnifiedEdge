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
    public class GetMqttServerByGuid : CommandBase<DTO_MqttServer>
    {
#nullable disable
        public string Guid { get; set; }
#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerByGuid Field Validator
    /// </summary>
    public class GetMqttServerByGuidValidator : AbstractValidator<GetMqttServerByGuid>
    {
        public GetMqttServerByGuidValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// GetMqttServerByGuid Field Authorization validator
    /// </summary>
    public class GetMqttServerByGuidAuthorizationValidator : AuthorizationValidator<GetMqttServerByGuid>
    {
        public GetMqttServerByGuidAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerByGuid</c> command </summary>
    public class GetMqttServerByGuidHandler : IRequestHandler<GetMqttServerByGuid, DTO_MqttServer>
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
        public GetMqttServerByGuidHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            ICurrentUser currentuser,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;

            _current = currentuser;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerByGuid</c>
        /// </summary>
        public async Task<DTO_MqttServer> Handle(
            GetMqttServerByGuid request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var query = dbContext.Servers
                .AsNoTracking()
                .OfType<Domain.Server.MqttServer>()
                .Where(e => e.UID == request.Guid)
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