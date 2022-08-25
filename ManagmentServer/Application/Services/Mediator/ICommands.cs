using Aplication.Core;
using MediatR;

namespace Aplication.Services
{

    public interface ICommandBase<TResponse> : IRequest<TResponse>, ISharedCommandBase { }

    public interface ICommandBase : IRequest, ISharedCommandBase { }

    public interface ISharedCommandBase
    {

#nullable enable
        string? ActivityId { get; set; }
#nullable disable

        CommandFlags Flags { get; set; }

#nullable enable
        long? monitor_time { get; set; }
#nullable disable
    }

}