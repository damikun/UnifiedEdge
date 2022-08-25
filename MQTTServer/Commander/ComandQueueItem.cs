
namespace Server.Commander
{
    internal sealed class CommandQueueItem
    {
        public CommandQueueItem(MqttCommand command, string service_id)
        {
            Command = command;
            Result = new CmdResult(command);
            ServiceId = service_id;
        }

        public readonly MqttCommand Command;

        public readonly CmdResult Result;

        public readonly string ServiceId;

        internal void SetState(CmdState new_state)
        {
            Result.State = new_state;
        }

    }
}