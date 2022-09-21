using MediatR;
using AutoMapper;

namespace Aplication.Graphql.Mutations
{

    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class MqttMutations
    {

        private readonly IMapper _mapper;
        public MqttMutations(
            IMapper mapper)
        {
            _mapper = mapper;
        }


    }
}