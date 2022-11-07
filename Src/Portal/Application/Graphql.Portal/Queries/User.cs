using MediatR;
using AutoMapper;
using Aplication.DTO;
using HotChocolate.Resolvers;
using Aplication.CQRS.Queries;
using Aplication.CQRS.Commands;
using Microsoft.AspNetCore.Http;
using HotChocolate.Types.Pagination;


namespace Aplication.Graphql.Queries
{
    /// <summary>
    ///  System Queries
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Query)]
    public class UserQueries
    {

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        public UserQueries(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<GQL_User?> me(
            [Service] IHttpContextAccessor accessor,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var dto = await mediator.Send(new GetCurrentUser());

            return mapper.Map<GQL_User>(dto);
        }

        [UseConnection(typeof(GQL_User))]
        public async Task<Connection<GQL_User>> GetUsers(
            IResolverContext ctx,
            [Service] IMediator mediator,
            CancellationToken cancellationToken
        )
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetUsers(arguments),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_User>>(result);
        }

        public async Task<GQL_User> GetUserById(
            [ID] string user_id,
            [Service] IMediator mediator,
            CancellationToken cancellationToken
        )
        {
            var result = await mediator.Send(
                new GetUserById
                {
                    UserId = user_id
                },
                cancellationToken
            );

            return _mapper.Map<GQL_User>(result);
        }

        public async Task<List<GQL_Claim>> GetUserClaims(
            [ID] string user_id,
            [Service] IMediator mediator,
            CancellationToken cancellationToken
        )
        {
            var result = await mediator.Send(
                new GetUserClaims
                {
                    UserId = user_id
                },
                cancellationToken
            );

            return _mapper.Map<List<GQL_Claim>>(result);
        }

        public async Task<List<string>> GetUserRoles(
            [ID] string user_id,
            [Service] IMediator mediator,
            CancellationToken cancellationToken
        )
        {
            var result = await mediator.Send(
                new GetUserRoles
                {
                    UserId = user_id
                },
                cancellationToken
            );

            return result;
        }

        public class IsAdminResult
        {
            public bool isAdmin { get; set; }
        }

        public async Task<IsAdminResult> IsAdmin(
            [ID] string user_id,
            [Service] IMediator mediator,
            CancellationToken cancellationToken
        )
        {
            var result = await mediator.Send(
                new TestIsAdmin
                {
                    UserId = user_id
                },
                cancellationToken
            );

            return new IsAdminResult()
            {
                isAdmin = result
            };
        }
    }
}