using Server;
using Persistence;
using Domain.Server;
using Microsoft.EntityFrameworkCore;

namespace Aplication.Services.ServerFascade
{
    public class ConfigMapper : IConfigMapper
    {
        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public ConfigMapper(
            IDbContextFactory<ManagmentDbCtx> factory
        )
        {
            _factory = factory;
        }

        public async Task<IServerCfg> GetServerConfig(
            string server_uid,
            CancellationToken ct = default
        )
        {
            ManagmentDbCtx db_ctx = await _factory.CreateDbContextAsync(ct);

            var server_cfg = await db_ctx.Servers
            .Where(e => e.UID == server_uid)
            .Select(e => e.Cfg)
            .FirstAsync(ct);

            return await Map(server_cfg, ct);
        }

        public async Task<ServerCfgBase> GetDbConfig(
            string server_uid,
            CancellationToken ct = default
        )
        {
            ManagmentDbCtx db_ctx = await _factory.CreateDbContextAsync(ct);

            var server_cfg = await db_ctx.Servers
            .Where(e => e.UID == server_uid)
            .Select(e => e.Cfg)
            .FirstAsync(ct);

            return server_cfg;
        }

        public async Task<IServerCfg> Map(
            ServerCfgBase db_cfg,
            CancellationToken ct = default
        )
        {
            switch (db_cfg)
            {
                case MqttServerCfg mqtt_cfg:
                    return await ResolveMqttServerCfg(mqtt_cfg, ct);

                default:
                    throw new Exception("ConfigMapper -> Unsupported config map");
            }
        }



        private async Task<IServerCfg> ResolveMqttServerCfg(
            MqttServerCfg cfg,
            CancellationToken ct = default
        )
        {
            ManagmentDbCtx db_ctx = await _factory.CreateDbContextAsync(ct);

            Domain.Server.ServerIPv4Endpoint endpoint = await db_ctx.Servers
            .Where(e => e.UID == cfg.ServerUID)
            .Include(e => e.Endpoints)
            .SelectMany(e => e.Endpoints)
            .FirstAsync(ct);

            return new Server.Mqtt.MqttServerCfg()
            {
                CommunicationTimeout = cfg.CommunicationTimeout,
                IpAddress = endpoint.IpAddress,
                Port = endpoint.Port,
                MaxPendingMessagesPerClient = cfg.MaxPendingMessagesPerClient,
                PresistentSession = cfg.PresistentSession,
                IsEnabled = cfg.IsEnabled,
                TimeStamp = cfg.TimeStamp,
                Server_UID = cfg.ServerUID
            };
        }
    }
}