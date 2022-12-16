
using Aplication.Mapping;

namespace Aplication.DTO
{

    public class GQL_TokenResponse : IMapFrom<DTO_TokenResponse>
    {
        public GQL_TokenResponse()
        {

        }

        public string? Handle { get; set; }

        public GQL_Token Token { get; set; }
    }
}