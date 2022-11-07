using Server;
using Domain.Server;

namespace Aplication.Services.ServerFascade
{
    public interface IConfigMapper
    {
        public Task<IServerCfg> Map(ServerCfgBase db_cfg, CancellationToken ct = default);

        public Task<IServerCfg> GetServerConfig(string server_uid, CancellationToken ct = default);

        public Task<ServerCfgBase> GetDbConfig(string server_uid, CancellationToken ct = default);

    }
}