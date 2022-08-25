using Aplication.Core;
using Aplication.Core.Pagination;

namespace Aplication.Interfaces
{

    public interface ICursorPagination<TEntity>
    {
        public ValueTask<(int skip, int take, int count)> GetPaginationRange(
          CursorArguments arguments,
          Func<CancellationToken, Task<int>> executeCount,
          CancellationToken cancellationToken);

        public EdgeBase<TEntity> CreateEdge(TEntity entity, int index);

        public Task<(IReadOnlyList<EdgeBase<TEntity>> edges, PageInfo pageInfo)> ApplyQueriablePagination(
            IQueryable<TEntity> queriable,
            CursorArguments arguments,
            Func<CancellationToken, Task<int>> count_provider,
            CancellationToken ct = default);
    }
}