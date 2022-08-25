using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.CQRS.Commands;

namespace Aplication.Graphql.Mutations
{

    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class EdgeMutations
    {
        private readonly IMapper _mapper;
        public EdgeMutations(IMapper mapper)
        {
            _mapper = mapper;
        }

        //----------------------------------------------
        //----------------------------------------------

        /// <summary>
        /// Sets Edge Name Input(update edge name)
        /// </summary>
        public class SetEdgeNameInput
        {

#nullable disable
            /// <summary> Name </summary>
            public string Name { get; set; }

#nullable enable

        }

        /// <summary>
        /// Sets Edge name 
        /// </summary>
        /// <returns>GQL_Edge</returns>
        public async Task<GQL_Edge> SetEdgeName(
             SetEdgeNameInput request,
             [Service] IMediator mediator)
        {
            var dto = await mediator.Send(new UpdateEdgeName()
            {
                Name = request.Name,
            });

            return _mapper.Map<GQL_Edge>(dto);
        }

        //----------------------------------------------
        //----------------------------------------------

        /// <summary>
        /// Sets Edge Description Input (update edge description)
        /// </summary>
        public class SetEdgeDescriptionInput
        {

#nullable disable
            /// <summary> Description </summary>
            public string Description { get; set; }

#nullable enable

        }

        /// <summary>
        /// Sets Edge description
        /// </summary>
        /// <returns>GQL_Edge</returns>
        public async Task<GQL_Edge> SetEdgeName(
             SetEdgeDescriptionInput request,
             [Service] IMediator mediator)
        {
            var dto = await mediator.Send(new UpdateEdgeDescription()
            {
                Description = request.Description,
            });

            return _mapper.Map<GQL_Edge>(dto);
        }

        //----------------------------------------------
        //----------------------------------------------

        /// <summary>
        /// Sets Edge Location Input (update edge location)
        /// </summary>
        public class SetEdgeLocationInput
        {

#nullable disable
            /// <summary> LocationA </summary>
            public string Location1 { get; set; }
            /// <summary> LocationB </summary>
            public string Location2 { get; set; }
            /// <summary> LocationC </summary>
            public string Location3 { get; set; }

#nullable enable

        }

        /// <summary>
        /// Sets Edge location
        /// </summary>
        /// <returns>GQL_Edge</returns>
        public async Task<GQL_Edge> SetEdgeLocation(
             SetEdgeLocationInput request,
             [Service] IMediator mediator)
        {
            var dto = await mediator.Send(new UpdateEdgeLocation()
            {
                Location1 = request.Location1,
                Location2 = request.Location2,
                Location3 = request.Location3,
            });

            return _mapper.Map<GQL_Edge>(dto);
        }
    }
}