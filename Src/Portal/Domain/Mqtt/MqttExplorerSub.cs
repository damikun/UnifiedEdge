namespace Domain.Server
{
    public class MqttExplorerSub
    {
        public long Id { get; set; }

#nullable disable
        public string ServerUid { get; set; }

        public string UserUid { get; set; }

        public string Topic { get; set; }


#nullable enable

        public int? Alias { get; set; }

        public string? Color { get; set; }

        public bool NoLocal { get; set; }
    }
}