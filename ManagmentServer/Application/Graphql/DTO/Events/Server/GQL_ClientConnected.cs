using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_ClientConnected
        : GQL_ServerEventBase, IMapFrom<DTO_ClientConnected>
    {
        public string ClientId { get; set; }
    }
}