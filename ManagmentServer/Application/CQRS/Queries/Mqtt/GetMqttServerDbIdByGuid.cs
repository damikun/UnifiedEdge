using MediatR;
using Persistence;
using Aplication.Core;
using FluentValidation;
using Aplication.Services;
using Aplication.CQRS.Behaviours;
using Microsoft.EntityFrameworkCore;

namespace Aplication.CQRS.Queries
{

    /// <summary>
    /// Query Mqtt Server DB id
    /// </summary>
    public class GetMqttServerDbIdByGuid : CommandBase<long>
    {
#nullable disable
        public string Guid { get; set; }

#nullable enable
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// GetMqttServerDbIdByGuid Field Validator
    /// </summary>
    public class GetMqttServerDbIdByGuidValidator : AbstractValidator<GetMqttServerDbIdByGuid>
    {
        public GetMqttServerDbIdByGuidValidator()
        {
            // Add Field validation..   
        }
    }

    /// <summary>
    /// GetMqttServerDbIdByGuid Field Authorization validator
    /// </summary>
    public class GetMqttServerDbIdByGuidAuthorizationValidator : AuthorizationValidator<GetMqttServerDbIdByGuid>
    {
        public GetMqttServerDbIdByGuidAuthorizationValidator()
        {
            // Add Field authorization..
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>GetMqttServerDbIdByGuid</c> command </summary>
    public class GetMqttServerDbIdByGuidHandler : IRequestHandler<GetMqttServerDbIdByGuid, long>
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
        /// Main constructor
        /// </summary>
        public GetMqttServerDbIdByGuidHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            ICurrentUser currentuser)
        {
            _factory = factory;

            _current = currentuser;
        }

        /// <summary>
        /// Command handler for <c>GetMqttServerDbIdByGuid</c>
        /// </summary>
        public async Task<long> Handle(
            GetMqttServerDbIdByGuid request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            var query = dbContext.Servers
                .AsNoTracking()
                .OfType<Server.Domain.MqttServer>()
                .Where(e => e.Guid == request.Guid)
                .Select(e => e.ID)
                .AsQueryable();

            var result = await query.FirstOrDefaultAsync(cancellationToken);

            if (result == default(int))
            {
                throw new Exception("Not Found");
            }

            return result;
        }
    }
}