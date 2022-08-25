
namespace Aplication.DTO
{

    public class GQL_Metric
    {
        public GQL_Metric()
        {
            TimeStamp = DateTime.Now;
        }

        public string Id { get; set; }

        public DateTime TimeStamp { get; set; }

        public string Name { get; set; }

        public dynamic? Value { get; set; }

        public string? Unit { get; set; }

        public string? Type { get; set; }

        public string Category => Name.Split(".").First();

        public string Source => Name.Split(".").Last();

    }
}