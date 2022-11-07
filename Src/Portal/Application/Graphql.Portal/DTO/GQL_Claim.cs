using Aplication.Mapping;

namespace Aplication.DTO
{

    public class GQL_Claim : IMapFrom<DTO_Claim>
    {
        public GQL_Claim()
        {

        }

        public string? Type { get; set; }

        public string? Value { get; set; }

    }
}