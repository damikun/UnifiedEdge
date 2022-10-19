
namespace Aplication.DTO
{
    public class GQL_ServerMetric
    {
        public GQL_ServerMetric()
        {
            TimeStamp = DateTime.Now;
        }

        public string Id { get; set; }

        public string Topic { get; set; }

        public dynamic? Value { get; set; }

        public string? Unit { get; set; }

        public string? Description { get; set; }

        public string MeterName { get; set; }

        public DateTime TimeStamp { get; set; }



        private string[] Namespace => Topic.Split(".");

        private string ServerPrefix => Namespace[0];

        private string ServerType => Namespace[1];

        private string ServerUid => Namespace[2];

        private string Event => Namespace[3];


        public void ValidateTopic()
        {
            if (Namespace.Length != 4)
            {
                throw new InvalidDataException("Topic must contains 4 parts: A.B.C.D");
            }

            if (ServerPrefix != "Server")
            {
                throw new InvalidDataException("Topic part A: `Prefix` must contains value:`Server`");
            }

            if (string.IsNullOrWhiteSpace(ServerType))
            {
                throw new InvalidDataException("Topic part B: `ServerType` must not be empty`");
            }

            if (string.IsNullOrWhiteSpace(ServerUid))
            {
                throw new InvalidDataException("Topic part C: `UID` must not be empty");
            }

            if (string.IsNullOrWhiteSpace(Event))
            {
                throw new InvalidDataException("Topic part D: `Event` must not be empty");
            }
        }
    }
}