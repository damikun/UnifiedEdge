namespace Domain.Server
{
    public class MqttAuthRule
    {
        public long Id { get; set; }

        public string? Topic { get; set; }

        public AuthAction AuthAction { get; set; }

        public MqttAction MqttAction { get; set; }
    }

    public enum AuthAction
    {
        Allow,
        Disallow
    }

    public enum MqttAction
    {
        Publish,
        Subscribe,
        PublishAndSubscribe
    }
}