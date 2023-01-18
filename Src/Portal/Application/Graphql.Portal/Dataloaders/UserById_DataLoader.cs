using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.Services;
using Aplication.CQRS.Queries;
using Microsoft.Extensions.DependencyInjection;

namespace Aplication.Graphql.DataLoaders
{

    public class UserByIdDataLoader : BatchDataLoader<string, GQL_User>
    {

        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current;

        /// <summary>
        /// Injected <c>IServiceProvider</c>
        /// </summary>
        private readonly IServiceProvider _provider;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        private SemaphoreSlim _semaphoregate = new SemaphoreSlim(1);

        public UserByIdDataLoader(
            IBatchScheduler scheduler,
            ICurrentUser current,
            IMapper mapper,
            IServiceProvider provider) : base(scheduler)
        {
            _current = current;

            _mapper = mapper;

            _provider = provider;
        }

        protected async override Task<IReadOnlyDictionary<string, GQL_User>> LoadBatchAsync(
            IReadOnlyList<string> keys,
            CancellationToken cancellationToken)
        {
            if (!_current.Exist)
            {
                return new List<GQL_User>().ToDictionary(e => e.Id, null);
            }

            var mediator = _provider.GetRequiredService<IMediator>();

            try
            {
                var dto = await mediator.Send(new GetUsersBatchById()
                {
                    UserIds = keys.ToArray()
                }, cancellationToken);

                return _mapper.Map<Dictionary<string, GQL_User>>(dto);
            }
            finally
            {
                _semaphoregate.Release();
            }
        }
    }
}
