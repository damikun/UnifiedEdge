using Aplication.DTO;
using Aplication.Services;

namespace Aplication.Graphql.DataLoaders
{

    public class UserByIdDataLoader : BatchDataLoader<string, GQL_User>
    {

        /// <summary>
        /// Injected <c>ICurrentUser</c>
        /// </summary>
        private readonly ICurrentUser _current;

        private SemaphoreSlim _semaphoregate = new SemaphoreSlim(1);

        public UserByIdDataLoader(
            IBatchScheduler scheduler,
            ICurrentUser current) : base(scheduler)
        {
            _current = current;

        }

        protected async override Task<IReadOnlyDictionary<string, GQL_User>> LoadBatchAsync(
            IReadOnlyList<string> keys,
            CancellationToken cancellationToken)
        {
            if (!_current.Exist)
            {
                return new List<GQL_User>().ToDictionary(e => e.Id, null);
            }

            await _semaphoregate.WaitAsync();

            try
            {
                return new List<GQL_User>().ToDictionary(e => e.Id, null);
            }
            finally
            {
                _semaphoregate.Release();
            }
        }
    }
}
