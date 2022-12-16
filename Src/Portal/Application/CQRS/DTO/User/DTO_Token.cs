using Duende.IdentityServer.Models;

namespace Aplication.DTO
{

    public class DTO_Token
    {
        public DTO_Token()
        {

        }

        public DTO_Token(PersistedGrant grant)
        {
            this.Id = grant.Key;
            this.SubjectId = grant.SubjectId;
            this.Description = grant.Description;
            this.Expiration = grant.Expiration;
        }


        public string Id { get; set; }

        public string SubjectId { get; set; }

        public string Description { get; set; }

        public DateTime? Expiration { get; set; }
    }
}