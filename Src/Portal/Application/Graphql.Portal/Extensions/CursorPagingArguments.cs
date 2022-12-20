using HotChocolate.Resolvers;
using Aplication.Core.Pagination;

namespace Aplication.Graphql
{
    public static partial class Extensions
    {

#nullable enable
        public static CursorArguments GetPaggingArguments(
            this IResolverContext context,
            bool AllowBackwardPagination = true,
            int DefaultPageSize = 10)
        {
            var MaxPageSize = int.MaxValue;

            if (MaxPageSize < DefaultPageSize)
            {
                DefaultPageSize = MaxPageSize;
            }

            var first = context.ArgumentValue<int?>(CursorPagingArgumentNames.First);

            var last = AllowBackwardPagination
                ? context.ArgumentValue<int?>(CursorPagingArgumentNames.Last)
                : null;

            if (first is null && last is null)
            {
                first = DefaultPageSize;
            }

            return new CursorArguments(
                first,
                last,
                context.ArgumentValue<string?>(CursorPagingArgumentNames.After),
                AllowBackwardPagination
                    ? context.ArgumentValue<string?>(CursorPagingArgumentNames.Before)
                    : null);

        }
#nullable disable

        internal static class CursorPagingArgumentNames
        {
            public const string First = "first";
            public const string After = "after";
            public const string Last = "last";
            public const string Before = "before";
        }
    }
}