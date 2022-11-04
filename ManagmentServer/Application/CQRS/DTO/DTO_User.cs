
using Aplication.Mapping;
using Domain.Server;

namespace Aplication.DTO
{

    public class DTO_User : IMapFrom<ApplicationUser>
    {
        public DTO_User()
        {

        }

        public string Id { get; set; }

        public string? UserName { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }
    }
}