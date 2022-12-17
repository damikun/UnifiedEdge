using Duende.IdentityServer.Models;

namespace Aplication.DTO
{

    public class DTO_Token
    {
        public DTO_Token()
        {

        }

        public DTO_Token(PersistedGrant grant, string? jsonData = null)
        {
            this.Id = grant.Key;
            this.SubjectId = grant.SubjectId;
            this.Description = grant.Description;
            this.Expiration = grant.Expiration;
            this.JsonData = jsonData;
        }


        public string Id { get; set; }

        public string SubjectId { get; set; }

        public string Description { get; set; }

        public string? JsonData { get; set; }

        public DateTime? Expiration { get; set; }
    }
}