
namespace Server
{

    internal abstract class StateBase<T> : IServiceState, IStateBase
    {
        internal T Provider;

        public StateBase(T provider)
        {
            Provider = provider;
        }

        public virtual Task OnBeforeStateEntry()
        {
            return Task.CompletedTask;
        }

        public virtual Task OnState()
        {
            return Task.CompletedTask;
        }

        public virtual Task OnBeforeStateLeave()
        {
            return Task.CompletedTask;
        }

        public abstract Task StartAsync();

        public abstract Task StopAsync();

        public abstract Task Restart();

    }
}
