
using Aplication.Core.Pagination;

namespace Aplication.DTO
{

    public class DTO_Connection<T>
    {
        public DTO_Connection()
        {

        }

        public IReadOnlyList<EdgeBase<T>> edges;

        public Core.PageInfo pageInfo;
    }
}