using Aplication.Graphql.Interfaces;
using System.Text.Json.Serialization;

namespace Aplication.DTO
{
    public class GQL_ServerEventBase
        : GQL_IServerEvent,
        GQL_IServerEventUnion
    {
        [JsonIgnore]
        public string ServerUid { get; set; }

        [JsonIgnore]
        public long ID { get; set; }
#nullable disable
        public string Name { get; set; }
#nullable enable
        public string? Description { get; set; }

        public ServerEventTypes Type { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;

        public string? AsJson { get; set; }

    }
}