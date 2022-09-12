

namespace Server
{

    internal class MQTTRunning : StateBase<CustomMQTTServer>
    {

        private readonly SemaphoreSlim Semaphore = new SemaphoreSlim(1);


        public MQTTRunning(CustomMQTTServer provider) : base(provider)
        {

        }

        public override async Task<IServiceState> Restart()
        {

            if (Semaphore.CurrentCount > 0)
            {
                await Semaphore.WaitAsync();

                try
                {
                    if (isRunningState())
                    {
                        await Provider.SetState(
                            new MQTTRestarting(this.Provider)
                        );
                    }

                    return Provider.State;
                }
                finally
                {
                    Semaphore.Release();
                }

            }

            return Provider.State;
        }

        private bool isRunningState()
        {
            if (Provider.State != null && Provider.State.GetType() == typeof(MQTTRunning))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public override Task<IServiceState> StartAsync()
        {
            // Do nothing
            return Task.FromResult(Provider.State);
        }


        public override async Task<IServiceState> StopAsync()
        {
            await Semaphore.WaitAsync();

            try
            {
                return await Provider.SetState(new MQTTStopping(this.Provider));
            }
            finally
            {
                Semaphore.Release();
            }
        }

    }

    internal class MQTTRestarting : StateBase<CustomMQTTServer>
    {
        public MQTTRestarting(CustomMQTTServer provider) : base(provider)
        {
        }

        public override async Task OnState()
        {
            await Provider.UnsafeStopAsync();
            await Provider.SetState(new MQTTStarting(this.Provider));
        }

        public override Task<IServiceState> Restart()
        {
            return Task.FromResult(Provider.State);
        }

        public override Task<IServiceState> StartAsync()
        {
            return Task.FromResult(Provider.State);
        }

        public override Task<IServiceState> StopAsync()
        {
            return Task.FromResult(Provider.State);
        }
    }


    internal class MQTTStarting : StateBase<CustomMQTTServer>
    {
        public MQTTStarting(CustomMQTTServer provider) : base(provider)
        {
        }

        public override async Task OnState()
        {
            await Task.Delay(1000);

            await Provider.UnsafeStartAsync();
        }

        public override Task<IServiceState> Restart()
        {
            return Task.FromResult(Provider.State);
        }

        public override Task<IServiceState> StartAsync()
        {
            return Task.FromResult(Provider.State);
        }

        public override Task<IServiceState> StopAsync()
        {
            return Provider.SetState(new MQTTStopping(this.Provider));
        }
    }


    internal class MQTTStopping : StateBase<CustomMQTTServer>
    {
        public MQTTStopping(CustomMQTTServer provider) : base(provider)
        {
        }

        public override async Task OnState()
        {
            await Provider.UnsafeStopAsync();

            await Task.Delay(1000);

            await Provider.SetState(new MQTTStopped(this.Provider));
        }

        public override Task<IServiceState> Restart()
        {
            return Task.FromResult(Provider.State);
        }

        public override Task<IServiceState> StartAsync()
        {
            return Task.FromResult(Provider.State);
        }

        public override Task<IServiceState> StopAsync()
        {
            return Task.FromResult(Provider.State);
        }
    }


    internal class MQTTStopped : StateBase<CustomMQTTServer>
    {

        public MQTTStopped(CustomMQTTServer provider) : base(provider)
        {
        }

        public override Task<IServiceState> Restart()
        {
            return StartAsync();
        }

        public override Task<IServiceState> StartAsync()
        {
            return Provider.SetState(new MQTTStarting(this.Provider));
        }

        public override async Task<IServiceState> StopAsync()
        {
            if (await Provider.IsRunning())
            {
                return await Provider.SetState(new MQTTStopping(this.Provider));
            }

            return Provider.State;
        }
    }
}
