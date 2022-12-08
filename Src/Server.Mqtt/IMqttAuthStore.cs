using Server.Mqtt.DTO;
using MQTTnet.Protocol;
using System.Collections;


namespace Server.Mqtt
{
    public interface IMqttAuthHandler
    {
        Task<(bool isSuccess, MqttConnectReasonCode reason, long? AuthId)> AuthenticateClient(
            string server_uid,
            string client_id,
            DTO_MqttAuthArgs ctx,
            CancellationToken ct = default
       );

        Task<(bool isSuccess, MqttConnectReasonCode reason, long? AuthId)> AuthenticateUser(
            string server_uid,
            string user_name,
            string password,
            DTO_MqttAuthArgs ctx,
            CancellationToken ct = default
        );
    }

    // This is Dummy handler in case no handler is provided... 
    // It always return TRUE as auth result for valid input arguments
    internal class DummyMqttAuthHandler : IMqttAuthHandler
    {
        public Task<(bool isSuccess, MqttConnectReasonCode reason, long? AuthId)> AuthenticateClient(
            string server_uid,
            string client_id,
            DTO_MqttAuthArgs ctx,
            CancellationToken ct = default
        )
        {
            if (string.IsNullOrWhiteSpace(server_uid) ||
                string.IsNullOrWhiteSpace(client_id)
            )
            {
                return Task.FromResult<(bool isSuccess, MqttConnectReasonCode reason, long? AuthId)>(
                    (false, MqttConnectReasonCode.ClientIdentifierNotValid, null)
                )!;
            }

            return Task.FromResult<(bool isSuccess, MqttConnectReasonCode reason, long? AuthId)>(
                (true, MqttConnectReasonCode.Success, null)
            )!;
        }

        public Task<(bool isSuccess, MqttConnectReasonCode reason, long? AuthId)> AuthenticateUser(
            string server_uid,
            string user_name,
            string password,
            DTO_MqttAuthArgs ctx,
            CancellationToken ct = default
        )
        {
            if (
                string.IsNullOrWhiteSpace(server_uid) ||
                string.IsNullOrWhiteSpace(user_name) ||
                string.IsNullOrWhiteSpace(password)
            )
            {
                return Task.FromResult<(bool isSuccess, MqttConnectReasonCode reason, long? AuthId)>(
                    (false, MqttConnectReasonCode.BadUserNameOrPassword, null)
                )!;
            }

            return Task.FromResult<(bool isSuccess, MqttConnectReasonCode reason, long? AuthId)>(
                (true, MqttConnectReasonCode.Success, null)
            )!;
        }
    }
}