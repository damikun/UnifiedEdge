using MediatR;

namespace Aplication.Services.Scheduler
{
    public interface ICommandHandler
    {
        Task<Unit> ExecuteCommand(MediatorSerializedObject mediatorSerializedObject);

        Task ExecuteCommand(string reuest);
    }
}