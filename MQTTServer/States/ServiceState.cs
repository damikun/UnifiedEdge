
using System.Threading.Tasks;

namespace Server
{
    public interface IServiceState : IStateBase
    {
        public Task<IServiceState> StartAsync();

        public Task<IServiceState> StopAsync();

        public Task<IServiceState> Restart();
    }
}
