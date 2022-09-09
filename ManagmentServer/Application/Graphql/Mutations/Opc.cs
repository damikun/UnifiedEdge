using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.CQRS.Commands;

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

        /// <summary>
        /// Crate  Opc Server Input object
        /// </summary>
        public class CreateOpcServerInput
        {

#nullable disable
            /// <summary> Name </summary>
            public string Name { get; set; }

#nullable enable

            /// <summary> Description </summary>
#nullable enable
            public string? Description { get; set; }
#nullable disable
        }

        /// <summary>
        /// Create new Opc Server
        /// </summary>
        /// <returns>DTO_OpcServer</returns>
        public async Task<GQL_OpcServer> CreateOpcServer(
             CreateOpcServerInput request,
             [Service] IMediator mediator)
        {
            var dto = await mediator.Send(new CreateOpcServer()
            {
                Name = request.Name,
                Description = request.Description,
            });

            return _mapper.Map<GQL_OpcServer>(dto);
        }

        /// <summary>
        /// Remove Opc Server Input object
        /// </summary>
        public class RemoveServerInput
        {

#nullable disable
            /// <summary> Id </summary>
            public string Id { get; set; }
#nullable enable

        }

        // /// <summary>
        // /// Remove new Opc Server
        // /// </summary>
        // /// <returns>Removed Id</returns>
        // public async Task<string> RemoveOpcServer(
        //      RemoveServerInput request,
        //      [Service] IMediator mediator)
        // {
        //     return await mediator.Send(new RemoveOpcServer()
        //     {
        //         Id = request.Id,
        //     });
        // }
    }
}