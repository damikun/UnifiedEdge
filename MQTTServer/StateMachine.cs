
namespace Server
{

    public interface IStateBase
    {
        public Task OnBeforeStateEntry();

        public Task OnState();

        public Task OnBeforeStateLeave();
    }

    public abstract class StateMachineBase<T> where T : IStateBase
    {

        protected internal T State { get; private set; }

        private readonly SemaphoreSlim Semaphore = new SemaphoreSlim(1);

        public StateMachineBase()
        {
            var default_state = DefaultState();

            if (default_state == null)
            {
                throw new ArgumentNullException("default_state", "Default state cannot be null ref.");
            }

            State = DefaultState();
        }

        protected internal virtual async Task<T> SetState(T newState)
        {

            var state_before = State;

            await Semaphore.WaitAsync()
            .ConfigureAwait(false);

            try
            {

                if (state_before.GetType() != State.GetType())
                {
                    throw new Exception("State inconsistency - State changes during waiting for transition");
                }

                await State.OnBeforeStateLeave()
                .ConfigureAwait(false);

                await newState.OnBeforeStateEntry()
                .ConfigureAwait(false);

                State = newState;

                await State.OnState()
                .ConfigureAwait(false);

                return newState;
            }
            finally
            {
                Semaphore.Release();
            }
        }

        protected abstract T DefaultState();
    }
}