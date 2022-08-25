

namespace Server
{

    internal class MQTTRunning : StateBase<MQTTService>
    {

        private readonly SemaphoreSlim Semaphore = new SemaphoreSlim(1);


        public MQTTRunning(MQTTService provider) : base(provider)
        {

        }

        public override async Task Restart()
        {

            if (Semaphore.CurrentCount > 0)
            {
                await Semaphore.WaitAsync();

                try
                {
                    if (isRunningState())
                    {
                        await Provider.SetState(new MQTTRestarting(this.Provider));
                    }
                }
                finally
                {
                    Semaphore.Release();
                }
            }
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

        public override Task StartAsync()
        {
            // Do nothing
            return Task.CompletedTask;
        }


        public override async Task StopAsync()
        {
            await Semaphore.WaitAsync();

            try
            {
                await Provider.SetState(new MQTTStopping(this.Provider));
            }
            finally
            {
                Semaphore.Release();
            }

        }

    }

    internal class MQTTRestarting : StateBase<MQTTService>
    {
        public MQTTRestarting(MQTTService provider) : base(provider)
        {
        }

        public override async Task OnState()
        {
            await Provider.UnsafeStopAsync();
            await Provider.SetState(new MQTTStarting(this.Provider));
        }

        public override Task Restart()
        {
            return Task.CompletedTask;
        }

        public override Task StartAsync()
        {
            return Task.CompletedTask;
        }

        public override Task StopAsync()
        {
            return Task.CompletedTask;
        }
    }


    internal class MQTTStarting : StateBase<MQTTService>
    {
        public MQTTStarting(MQTTService provider) : base(provider)
        {
        }

        public override async Task OnState()
        {
            await Task.Delay(1000);

            await Provider.UnsafeStartAsync();
        }

        public override Task Restart()
        {
            return Task.CompletedTask;
        }

        public override Task StartAsync()
        {
            return Task.CompletedTask;
        }

        public override Task StopAsync()
        {
            return Provider.SetState(new MQTTStopping(this.Provider));
        }
    }


    internal class MQTTStopping : StateBase<MQTTService>
    {
        public MQTTStopping(MQTTService provider) : base(provider)
        {
        }

        public override async Task OnState()
        {
            await Provider.UnsafeStopAsync();

            await Task.Delay(1000);

            await Provider.SetState(new MQTTStopped(this.Provider));
        }

        public override Task Restart()
        {
            return Task.CompletedTask;
        }

        public override Task StartAsync()
        {
            return Task.CompletedTask;
        }

        public override Task StopAsync()
        {
            return Task.CompletedTask;
        }
    }


    internal class MQTTStopped : StateBase<MQTTService>
    {

        public MQTTStopped(MQTTService provider) : base(provider)
        {
        }

        public override Task Restart()
        {
            return StartAsync();
        }

        public override Task StartAsync()
        {
            return Provider.SetState(new MQTTStarting(this.Provider));
        }

        public override async Task StopAsync()
        {
            if (await Provider.IsRunning())
            {
                await Provider.SetState(new MQTTStopping(this.Provider));
            }

            await Task.CompletedTask;
        }
    }
}
