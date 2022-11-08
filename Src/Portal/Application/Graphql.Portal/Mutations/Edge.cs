using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.CQRS.Commands;
using Aplication.Graphql.Errors;

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
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
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
        /// Sets Edge Description Input(update edge description)
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
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_Edge> SetEdgeDescription(
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
        public class SetEdgeLocation1Input
        {

#nullable disable
            /// <summary> LocationA </summary>
            public string Location1 { get; set; }

#nullable enable

        }

        /// <summary>
        /// Sets Edge location1
        /// </summary>
        /// <returns>GQL_Edge</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_Edge> SetEdgeLocation1(
             SetEdgeLocation1Input request,
             [Service] IMediator mediator)
        {
            var dto = await mediator.Send(new UpdateEdgeLocation1()
            {
                Location1 = request.Location1,
            });

            return _mapper.Map<GQL_Edge>(dto);
        }

        /// <summary>
        /// Sets Edge Location Input (update edge location)
        /// </summary>
        public class SetEdgeLocation2Input
        {

#nullable disable
            /// <summary> LocationB </summary>
            public string Location2 { get; set; }

#nullable enable

        }

        /// <summary>
        /// Sets Edge location2
        /// </summary>
        /// <returns>GQL_Edge</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_Edge> SetEdgeLocation2(
             SetEdgeLocation2Input request,
             [Service] IMediator mediator)
        {
            var dto = await mediator.Send(new UpdateEdgeLocation2()
            {
                Location2 = request.Location2,
            });

            return _mapper.Map<GQL_Edge>(dto);
        }

        /// <summary>
        /// Sets Edge Location Input (update edge location)
        /// </summary>
        public class SetEdgeLocation3Input
        {

#nullable disable
            /// <summary> LocationC </summary>
            public string Location3 { get; set; }

#nullable enable

        }

        /// <summary>
        /// Sets Edge location3
        /// </summary>
        /// <returns>GQL_Edge</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_Edge> SetEdgeLocation3(
             SetEdgeLocation3Input request,
             [Service] IMediator mediator)
        {
            var dto = await mediator.Send(new UpdateEdgeLocation3()
            {
                Location3 = request.Location3,
            });

            return _mapper.Map<GQL_Edge>(dto);
        }

        /// <summary>
        /// Sets Edge default adapter
        /// </summary>
        /// <returns>GQL_DefaultAdapter</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_DefaultAdapter> SetEdgeDefaultNetworkAdapter(
             [ID] string adapter_id,
             [Service] IMediator mediator)
        {
            var dto = await mediator.Send(new SetDefaultAdapter()
            {
                adapter_id = adapter_id,
            });

            return new GQL_DefaultAdapter()
            {
                Adapter = _mapper.Map<GQL_Adapter>(dto)
            };
        }
    }
}