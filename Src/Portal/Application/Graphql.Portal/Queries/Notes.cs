using MediatR;
using AutoMapper;
using Aplication.DTO;
using HotChocolate.Resolvers;
using Aplication.CQRS.Queries;
using HotChocolate.Types.Pagination;


namespace Aplication.Graphql.Queries
{
    /// <summary>
    /// NotesQueries
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Query)]
    public class NotesQueries
    {

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        public NotesQueries(IMapper mapper)
        {
            _mapper = mapper;
        }

        /// </summary>
        public enum NoteFilter
        {
            /// The (public + private)
            all,

            /// Only public notes
            public_only,

            /// Only private notes
            private_only
        }

        [UseConnection(typeof(GQL_Note))]
        public async Task<Connection<GQL_Note>> GetNotes(
            IResolverContext ctx,
            NoteFilter filter,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetNotes(arguments)
                {
                    privateOnly = filter == NoteFilter.private_only,
                    publicOnly = filter == NoteFilter.public_only
                },
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_Note>>(result);
        }

        public async Task<GQL_Note> GetNoteById(
            [ID] long note_id,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetNoteById(note_id),
                cancellationToken
            );

            return _mapper.Map<GQL_Note>(result);
        }
    }
}