using AutoMapper;

namespace Aplication.Graphql.Mutations
{

    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class OpcMutations
    {
        // private readonly IOpcManager _manager;

        private readonly IMapper _mapper;
        public OpcMutations(
            // IOpcManager manager,
            IMapper mapper)
        {
            // _manager = manager;
            _mapper = mapper;
        }

    }
}