
namespace Aplication.Services.SystemEventHandler
{
    public interface ISystemEventPublisher
    {

        public void PublishInfo(string name, string? description = default, string? json = default);

        public void PublishWarning(string name, string? description = default, string? json = default);

        public void PublishError(string name, Exception? ex = null);

        public void PublishError(string name, string? description = default, string? json = default);

    }
}
