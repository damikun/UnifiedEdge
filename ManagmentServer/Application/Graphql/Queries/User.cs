using MediatR;
using AutoMapper;
using Aplication.DTO;

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
            [Service] IMediator mediator)
        {
            // var dto = await mediator.Send(new GetMqttServerByGuid()
            // {
            //     Guid = guid
            // });

            return new GQL_User()
            {
                Id = 21,
                Name = "Dalibor"
            };

            // return _mapper.Map<GQL_MqttServer>(dto);
        }
    }
}