
namespace Aplication.DTO
{

    public class DTO_User
    {
        public DTO_User()
        {

        }

        // <summary>
        /// ID
        /// </summary>
        public string Guid { get; set; }

        /// <summary>
        ///  Name
        /// </summary>
        public string Name { get; set; }

#nullable enable

        /// <summary>
        ///  Email
        /// </summary>
        public string? Email { get; set; }
#nullable disable
    }
}


