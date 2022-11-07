
using Aplication.Mapping;

namespace Aplication.DTO
{

    public class GQL_User : IMapFrom<DTO_User>
    {
        public GQL_User()
        {

        }

        // <summary>
        /// ID
        /// </summary>
        public string Id { get; set; }

        public string? UserName { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? SessionId { get; set; }

        public bool Enabled { get; set; }
    }
}