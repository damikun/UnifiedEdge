using Aplication.Graphql.Interfaces;

namespace Aplication.DTO
{
    public class GQL_ConfigMatch
    {
        public GQL_ConfigMatch()
        {

        }

        public bool IsMatch { get; set; }

        public GQL_IServer Server { get; set; }

        public DateTime Timestamp { get; set; }
    }
}