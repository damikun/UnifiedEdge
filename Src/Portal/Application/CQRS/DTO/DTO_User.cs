
using Domain.Server;
using Aplication.Mapping;

namespace Aplication.DTO
{

    public class DTO_User : IMapFrom<ApplicationUser>
    {
        public DTO_User()
        {

        }

        public string Id { get; set; }

        public string Sub
        {
            get
            {
                return Id;
            }
        }

        public string? UserName { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public bool Enabled { get; set; }
    }
}