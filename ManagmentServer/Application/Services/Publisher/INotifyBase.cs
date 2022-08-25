using MediatR;

namespace Aplication.Services
{

    /// <summary>Base Notifi</summary>
    public interface INotifiBase : INotification
    {
        DateTime TimeStamp { get; set; }

#nullable enable
        public string? ActivityId { get; set; }
#nullable disable
    }
}
