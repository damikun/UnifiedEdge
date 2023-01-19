using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.CQRS.Commands;
using Aplication.Graphql.Errors;

namespace Aplication.Graphql.Mutations
{
    /// <summary>
    /// Note Mutations
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class NotesMutations
    {
        private readonly IMapper _mapper;

        public NotesMutations(IMapper mapper)
        {
            _mapper = mapper;
        }

        /// <summary>
        /// Creates new note
        /// </summary>
        /// <returns>GQL_Note</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_Note> CreateNote(
            string name,
            string data,
            bool isPrivate,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var dto = await mediator.Send(new CreateNote()
            {
                Name = name,
                Data = data,
                IsPrivate = isPrivate
            });

            return _mapper.Map<GQL_Note>(dto);
        }

        /// <summary>
        /// Update note
        /// </summary>
        /// <returns>GQL_Note</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_Note> UpdateNote(
            [ID] long noteId,
            string data,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var dto = await mediator.Send(new UpdateNote()
            {
                Data = data,
                NoteId = noteId
            });

            return _mapper.Map<GQL_Note>(dto);
        }

        /// <summary>
        /// Remove note
        /// </summary>
        /// <returns>GQL_Note</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_Note> RemoveNote(
            [ID] long noteId,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var dto = await mediator.Send(new RemoveNote()
            {
                NoteId = noteId
            });

            return _mapper.Map<GQL_Note>(dto);
        }

        /// <summary>
        /// Highlight Note
        /// </summary>
        /// <returns>GQL_Note</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_Note> HighlightNote(
            [ID] long noteId,
            bool highlight,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var dto = await mediator.Send(new HighlightNote()
            {
                NoteId = noteId,
                Highlighted = highlight
            });

            return _mapper.Map<GQL_Note>(dto);
        }

        /// <summary>
        /// Set Note Private
        /// </summary>
        /// <returns>GQL_Note</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_Note> SetNotePublic(
            [ID] long noteId,
            bool isPrivate,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var dto = await mediator.Send(new SetNotePrivate()
            {
                NoteId = noteId,
                isPrivate = isPrivate
            });

            return _mapper.Map<GQL_Note>(dto);
        }

        /// <summary>
        /// Update Note Name
        /// </summary>
        /// <returns>GQL_Note</returns>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_Note> UpdateNoteName(
            [ID] long noteId,
            string name,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var dto = await mediator.Send(new UpdateNoteName()
            {
                NoteId = noteId,
                Name = name
            });

            return _mapper.Map<GQL_Note>(dto);
        }
    }
}
