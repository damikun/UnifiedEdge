using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.CQRS.Commands;
using Aplication.Graphql.Errors;

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
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_User> CreateUser(
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

        /// <summary>
        /// Remove user
        /// </summary>
        /// <returns>GQL_User</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_User> RemoveUser(
            [ID] string user_id,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var dto = await mediator.Send(new RemoveUser()
            {
                UserId = user_id
            });

            return _mapper.Map<GQL_User>(dto);
        }

        /// <summary>
        /// Update user firstName
        /// </summary>
        /// <returns>GQL_User</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_User> UpdateUserFirstName(
            [ID] string user_id,
            string first_name,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var dto = await mediator.Send(new UpdateUserFirstName()
            {
                UserId = user_id,
                FirstName = first_name
            });

            return _mapper.Map<GQL_User>(dto);
        }

        /// <summary>
        /// Update user lastname
        /// </summary>
        /// <returns>GQL_User</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_User> UpdateUserLastName(
            [ID] string user_id,
            string last_name,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var dto = await mediator.Send(new UpdateUserLastName()
            {
                UserId = user_id,
                LastName = last_name
            });

            return _mapper.Map<GQL_User>(dto);
        }

        /// <summary>
        /// Update user enabled
        /// </summary>
        /// <returns>GQL_User</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_User> UpdateUserEnabled(
            [ID] string user_id,
            bool enable,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var dto = await mediator.Send(
                new UpdateUserEnabled()
                {
                    UserId = user_id,
                    Enable = enable
                }
            );

            return _mapper.Map<GQL_User>(dto);
        }

        /// <summary>
        /// Set user admin
        /// </summary>
        /// <returns>GQL_User</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_User> SetUserAdmin(
            [ID] string user_id,
            bool is_admin,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            if (is_admin)
            {
                var dto = await mediator.Send(
                    new SetUserAdmin()
                    {
                        UserId = user_id,
                    }
                );

                return _mapper.Map<GQL_User>(dto);
            }
            else
            {
                var dto = await mediator.Send(
                    new RemoveUserAdmin()
                    {
                        UserId = user_id,
                    }
                );

                return _mapper.Map<GQL_User>(dto);
            }
        }


        /// <summary>
        /// Set user Password
        /// </summary>
        /// <returns>GQL_User</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_User> SetUserPassword(
            [ID] string user_id,
            string current_password,
            string new_password,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var dto = await mediator.Send(
                new SetUserPassword()
                {
                    UserId = user_id,
                    CurrentPassword = current_password,
                    NewPassword = new_password
                }
            );

            return _mapper.Map<GQL_User>(dto);
        }

    }
}