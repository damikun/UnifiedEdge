using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Interfaces;
using HotChocolate.Resolvers;
using Aplication.CQRS.Queries;
using HotChocolate.Types.Pagination;

namespace Aplication.Graphql.Queries
{
    /// <summary>
    /// GlobalQueries
    /// </summary>
    [ExtendObjectType(OperationTypeNames.Query)]
    public class GlobalQueries
    {
        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        public GlobalQueries(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<GQL_Adapter> GetAdapterById(
            [ID] string id,
            IResolverContext ctx,
            [Service] IMediator mediator,
            CancellationToken cancellationToken)
        {
            var result = await mediator.Send(
                new GetAdapterById()
                {
                    ID = id
                },
                cancellationToken
            );

            return _mapper.Map<GQL_Adapter>(result);
        }

        [UseConnection(typeof(GQL_Adapter))]
        public async Task<Connection<GQL_Adapter>> GetAdapters(
            IResolverContext ctx,
            [Service] IMediator mediator,
            [Service] ICursorPagination<GQL_Adapter> _cursor_provider,
            CancellationToken cancellationToken)
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetAdapters(arguments),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_Adapter>>(result);
        }

        [UseConnection(typeof(GQL_AdapterLog))]
        public async Task<Connection<GQL_AdapterLog>> GetAdapterLogs(
            IResolverContext ctx,
            [ID] string adapter_id,
            [Service] IMediator mediator,
            [Service] ICursorPagination<GQL_AdapterLog> _cursor_provider,
            CancellationToken cancellationToken
        )
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetAdapterLogs(arguments, adapter_id),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_AdapterLog>>(result);
        }

        [UseConnection(typeof(GQL_WebHook))]
        public async Task<Connection<GQL_WebHook>> GetWebHooks(
            IResolverContext ctx,
            [Service] IMediator mediator,
            CancellationToken cancellationToken
        )
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetWebHooks(arguments),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_WebHook>>(result);
        }

        [UseConnection(typeof(GQL_WebHookRecord))]
        public async Task<Connection<GQL_WebHookRecord>> GetWebHookRecords(
            IResolverContext ctx,
            [ID] long hook_id,
            [Service] IMediator mediator,
            CancellationToken cancellationToken
        )
        {
            var arguments = ctx.GetPaggingArguments();

            var result = await mediator.Send(
                new GetWebHookRecords(arguments, hook_id),
                cancellationToken
            );

            return _mapper.Map<Connection<GQL_WebHookRecord>>(result);
        }

        public async Task<GQL_WebHook> GetWebHookById(
            [ID] long hook_id,
            [Service] IMediator mediator,
            [Service] IMapper mapper,
            CancellationToken cancellationToken
        )
        {
            var result = await mediator.Send(
                new GetWebHookById(hook_id),
                cancellationToken
            );

            return mapper.Map<GQL_WebHook>(result);
        }

        public async Task<GQL_WebHookRecord> GetWebHookRecordById(
            [ID] long record_id,
            [Service] IMediator mediator,
            [Service] IMapper mapper,
            CancellationToken cancellationToken
        )
        {
            var result = await mediator.Send(
                new GetWebHookRecordById(record_id),
                cancellationToken
            );

            return mapper.Map<GQL_WebHookRecord>(result);
        }

        public async Task<GQL_WebHook> GetWebHookByUid(
            string hook_uid,
            [Service] IMediator mediator,
            [Service] IMapper mapper,
            CancellationToken cancellationToken
        )
        {
            var result = await mediator.Send(
                new GetWebHookByUid(hook_uid),
                cancellationToken
            );

            return mapper.Map<GQL_WebHook>(result);
        }
    }
}