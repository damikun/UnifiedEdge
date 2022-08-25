
using System.Threading.Tasks;

namespace Server
{
    public interface IServiceState: IStateBase {
        public Task StartAsync();

        public Task StopAsync();

        public Task Restart();
    }
}
