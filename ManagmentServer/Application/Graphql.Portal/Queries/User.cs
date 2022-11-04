using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.CQRS.Queries;
using Microsoft.AspNetCore.Http;


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
            [Service] IMapper mapper)
        {
            var dto = await mediator.Send(new GetCurrentUser());

            // var result = await accessor?.HttpContext?.AuthenticateAsync();

            // System.Console.WriteLine("***********************");
            // if (result != null && result.Principal != null)
            // {

            //     foreach (var item in result.Principal.Claims)
            //     {
            //         System.Console.WriteLine(item.Value);
            //     }
            // }

            // return new GQL_User()
            // {
            //     Id = 21,
            //     Name = "Dalibor"
            // };

            return mapper.Map<GQL_User>(dto);
        }
    }
}