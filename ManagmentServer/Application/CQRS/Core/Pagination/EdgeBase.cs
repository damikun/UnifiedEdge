
using Aplication.Interfaces;

namespace Aplication.Core.Pagination
{
    public class EdgeBase<T> : IEdgeBase
    {
        public EdgeBase(T node, string cursor)
        {
            if (string.IsNullOrEmpty(cursor))
            {
                throw new ArgumentNullException(nameof(cursor));
            }

            Node = node;
            Cursor = cursor;
        }

        public T Node { get; }

        object? IEdgeBase.Node => Node;

        public string Cursor { get; }
    }
}