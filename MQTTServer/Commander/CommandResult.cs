namespace Server.Commander
{
    public enum CmdState
    {
        init,
        queued,
        pending,
        done,
        errored
    }

    public interface ICmdResult
    {
        public CmdState State { get; }
    }

    public sealed class CmdResult : ICmdResult
    {
        public string Guid { get; init; }

        internal CmdResult(MqttCommand command)
        {
            _command = command;

            Guid = new Guid().ToString();
        }

        public readonly MqttCommand _command;

        public CmdState State { get; internal set; } = CmdState.init;

    }
}