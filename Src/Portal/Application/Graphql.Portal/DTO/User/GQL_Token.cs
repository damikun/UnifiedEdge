
using Aplication.Mapping;

namespace Aplication.DTO
{

    public class GQL_Token : IMapFrom<DTO_Token>
    {
        public GQL_Token()
        {

        }

        public string Id { get; set; }

        public string SubjectId { get; set; }

        public string Description { get; set; }

        public string? JsonData { get; set; }

        public DateTime? Expiration { get; set; }
    }
}