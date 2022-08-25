
using Aplication.Interfaces;

namespace Aplication.Core
{
    public class PageInfo : IPageInfo
    {
        public PageInfo(
            bool hasNextPage,
            bool hasPreviousPage,
            string? startCursor,
            string? endCursor,
            int? totalCount = null)
        {
            HasNextPage = hasNextPage;
            HasPreviousPage = hasPreviousPage;
            StartCursor = startCursor;
            EndCursor = endCursor;
            TotalCount = totalCount;
        }

        public bool HasNextPage { get; }

        public bool HasPreviousPage { get; }

        public string? StartCursor { get; }

        public string? EndCursor { get; }

        public int? TotalCount { get; }
    }
}