using Aplication.Services;

namespace Aplication.Core
{

    /// <summary>
    /// Base abstract class of all Notifi
    /// </summary>
    public abstract class BaseNotifi : INotifiBase
    {
#nullable enable
        public string? ActivityId { get; set; }
#nullable disable
        public DateTime TimeStamp { get; set; } = DateTime.Now;

        public string Type { get { return this.GetType().Name; } }
    }

}