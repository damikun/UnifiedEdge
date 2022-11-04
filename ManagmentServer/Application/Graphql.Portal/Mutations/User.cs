using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.CQRS.Commands;

namespace Aplication.Graphql.Mutations
{

    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class UserMutations
    {
        private readonly IMapper _mapper;
        public UserMutations(IMapper mapper)
        {
            _mapper = mapper;
        }

        /// <summary>
        /// Creates new user
        /// </summary>
        /// <returns>GQL_User</returns>
        public async Task<GQL_User> CreateUeser(
            string user_name,
            string first_name,
            string last_name,
            string password,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var dto = await mediator.Send(new CreateUser()
            {
                UserName = user_name,
                FirstName = first_name,
                LastName = last_name,
                Password = password
            });

            return _mapper.Map<GQL_User>(dto);
        }

    }
}