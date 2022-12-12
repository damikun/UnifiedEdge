using Domain;
using Aplication.Mapping;

namespace Aplication.DTO
{

    public class DTO_Edge : IMapFrom<Edge>
    {
        public DTO_Edge()
        {

        }

        public string Name { get; set; }

        public string Guid { get; set; }

        public string? Description { get; set; }

        public string? Location1 { get; set; }

        public string? Location2 { get; set; }

        public string? Location3 { get; set; }

        public bool ApiGraphql { get; set; }

        public bool ApiRest { get; set; }
    }
}