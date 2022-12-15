
using Domain.Server;
using Aplication.Mapping;

namespace Aplication.DTO
{

    public class DTO_Token
    {
        public DTO_Token()
        {

        }

        public string Id { get; set; }

        public string SubjectId { get; set; }

        public string Token { get; set; }

        public string Description { get; set; }
    }
}