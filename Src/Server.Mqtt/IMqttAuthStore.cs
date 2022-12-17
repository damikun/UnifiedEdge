using Server.Mqtt.DTO;
using MQTTnet.Protocol;

namespace Server.Mqtt
{
    public interface IMqttAuthHandler
    {
        Task<MqttAuthResult> AuthenticateClient(
            DTO_MqttAuthArgs ctx,
            CancellationToken ct = default
       );

        Task<MqttAuthResult> AuthenticateUser(
            string password,
            DTO_MqttAuthArgs ctx,
            CancellationToken ct = default
        );
    }

    public class MqttAuthResult
    {
        public MqttAuthResult()
        {

        }

        public MqttAuthResult(MqttConnectReasonCode result)
        {
            Result = result;
        }

        public bool isSuccess
        {
            get
            {
                return Result == MqttConnectReasonCode.Success;
            }
        }

        public MqttConnectReasonCode Result { get; set; }

        public object? AuthId { get; set; }

    }

    // This is Dummy handler in case no handler is provided... 
    // It always return TRUE as auth result for valid input arguments
    internal class DummyMqttAuthHandler : IMqttAuthHandler
    {
        public Task<MqttAuthResult> AuthenticateClient(
            DTO_MqttAuthArgs ctx,
            CancellationToken ct = default
        )
        {
            if (string.IsNullOrWhiteSpace(ctx.ServerUid) ||
                string.IsNullOrWhiteSpace(ctx.ClientId)
            )
            {
                return Task.FromResult<MqttAuthResult>(
                    new MqttAuthResult()
                    {
                        Result = MqttConnectReasonCode.ClientIdentifierNotValid
                    }
                );
            }

            return Task.FromResult<MqttAuthResult>(
                new MqttAuthResult()
                {
                    Result = MqttConnectReasonCode.Success
                }
            );
        }

        public Task<MqttAuthResult> AuthenticateUser(
            string password,
            DTO_MqttAuthArgs ctx,
            CancellationToken ct = default
        )
        {
            if (
                string.IsNullOrWhiteSpace(ctx.ServerUid) ||
                string.IsNullOrWhiteSpace(ctx.UserName) ||
                string.IsNullOrWhiteSpace(password)
            )
            {
                return Task.FromResult<MqttAuthResult>(
                    new MqttAuthResult()
                    {
                        Result = MqttConnectReasonCode.BadUserNameOrPassword
                    }
                );
            }

            return Task.FromResult<MqttAuthResult>(
                new MqttAuthResult()
                {
                    Result = MqttConnectReasonCode.Success
                }
            );
        }
    }
}