
namespace Domain.Server
{
    public enum MessageQoS
    {
        AtMostOnce = 0,
        AtLeastOnce = 1,
        ExactlyOnce = 2
    }
}