using AutoMapper;
using System.Collections;
using Aplication.Interfaces;
using Microsoft.EntityFrameworkCore;

#nullable enable

namespace Aplication.Core.Pagination
{

    public sealed class CursorPagination<TEntity> : ICursorPagination<TEntity>
    {
        public readonly IMapper _mapper;

        public CursorPagination(IMapper mapper)
        {
            _mapper = mapper;
        }

        public EdgeBase<TEntity> CreateEdge(TEntity entity, int index)
        {
            return CursorEdge<TEntity>.Create(entity, index);
        }

        public async Task<(IReadOnlyList<EdgeBase<TEntity>> edges, PageInfo pageInfo)> ApplyQueriablePagination(
            IQueryable<TEntity> queriable,
            CursorArguments arguments,
            Func<CancellationToken, Task<int>> count_provider,
            CancellationToken ct = default)
        {
            var cursor_range = await this.GetPaginationRange(
                arguments,
                count_provider,
                ct);

            var skip = cursor_range.skip;
            var take = cursor_range.take;

            if (skip != 0)
            {
                queriable = queriable.Skip(skip);
            }

            if (take > 0)
            {
                queriable = queriable.Take(take);
            }

            var index = skip;

            var list = new List<EdgeBase<TEntity>>();

            if (queriable is IAsyncEnumerable<TEntity>)
            {
                await foreach (var item in queriable.AsAsyncEnumerable())
                {
                    if (ct.IsCancellationRequested)
                    {
                        break;
                    }

                    list.Add(this.CreateEdge(
                        _mapper.Map<TEntity>(item),
                        index++
                    ));
                }
            }
            else
            {
                foreach (var item in queriable)
                {
                    if (ct.IsCancellationRequested)
                    {
                        break;
                    }

                    list.Add(this.CreateEdge(
                        _mapper.Map<TEntity>(item),
                        index++
                    ));
                }
            }

            var moreItemsReturnedThanRequested = list.Count > cursor_range.count;

            var isSequenceFromStart = skip == 0;

            IReadOnlyList<EdgeBase<TEntity>> edges = new SkipLastCollection<EdgeBase<TEntity>>(
                list,
                moreItemsReturnedThanRequested);

            PageInfo pageInfo =
                CreatePageInfo(isSequenceFromStart, moreItemsReturnedThanRequested, edges);

            return (edges, pageInfo);
        }

        public async ValueTask<(int skip, int take, int count)> GetPaginationRange(
          CursorArguments arguments,
          Func<CancellationToken, Task<int>> executeCount,
          CancellationToken cancellationToken)
        {
            var maxElementCount = int.MaxValue;

            if (arguments.Before is null && arguments.First is null)
            {
                var count = await executeCount(cancellationToken);
                maxElementCount = count;

                executeCount = _ => Task.FromResult(count);
            }

            CursorPagingRange range = SliceRange(arguments, maxElementCount);

            var skip = range.Start;
            var take = range.Count();

            return await ValueTask.FromResult((skip, take, range.Count()));
        }

        private CursorPagingRange SliceRange(
        CursorArguments arguments,
        int maxElementCount)
        {

            var startIndex = arguments.After is { } a
                ? CursorEdge<TEntity>.DeserializeCursor(a) + 1
                : 0;

            var before = arguments.Before is { } b
                ? CursorEdge<TEntity>.DeserializeCursor(b)
                : maxElementCount;

            var startOffsetCorrection = 0;
            if (startIndex < 0)
            {
                startOffsetCorrection = Math.Abs(startIndex);
                startIndex = 0;
            }

            CursorPagingRange range = new(startIndex, before);

            ValidateFirst(arguments, out var first);

            if (first is not null)
            {
                first -= startOffsetCorrection;
                if (first < 0)
                {
                    first = 0;
                }
            }

            range.Take(first);

            ValidateLast(arguments, out var last);

            range.TakeLast(last);

            return range;
        }
        private static PageInfo CreatePageInfo(
            bool isSequenceFromStart,
            bool moreItemsReturnedThanRequested,
            IReadOnlyList<EdgeBase<TEntity>> selectedEdges)
        {
            var hasNextPage = moreItemsReturnedThanRequested;

            var hasPreviousPage = !isSequenceFromStart;

            EdgeBase<TEntity>? firstEdge = null;
            EdgeBase<TEntity>? lastEdge = null;

            if (selectedEdges.Count > 0)
            {
                firstEdge = selectedEdges[0];
                lastEdge = selectedEdges[selectedEdges.Count - 1];
            }

            return new PageInfo(
                hasNextPage,
                hasPreviousPage,
                firstEdge?.Cursor,
                lastEdge?.Cursor);
        }

        private static void ValidateFirst(
            CursorArguments arguments,
            out int? first)
        {
            if (arguments.First < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(first));
            }

            first = arguments.First;
        }

        private static void ValidateLast(
            CursorArguments arguments,
            out int? last)
        {
            if (arguments.Last < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(last));
            }

            last = arguments.Last;
        }

        private class SkipLastCollection<T> : IReadOnlyList<T>
        {
            private readonly IReadOnlyList<T> _items;
            private readonly bool _skipLast;

            public SkipLastCollection(
                IReadOnlyList<T> items,
                bool skipLast = false)
            {
                _items = items;
                _skipLast = skipLast;
                Count = _items.Count;

                if (skipLast && Count > 0)
                {
                    Count--;
                }
            }

            public int Count { get; }

            public IEnumerator<T> GetEnumerator()
            {
                for (var i = 0; i < _items.Count; i++)
                {
                    if (i == _items.Count - 1 && _skipLast)
                    {
                        break;
                    }

                    yield return _items[i];
                }
            }

            IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

            public T this[int index] => _items[index];
        }

    }
}