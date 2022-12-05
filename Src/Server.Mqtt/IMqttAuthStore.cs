
namespace Server.Mqtt
{
    public interface IMqttAuthHandler
    {
        Task<(bool result, string? message)> AuthenticateClient(
           string server_uid,
           string client_id,
           CancellationToken ct = default
       );

        Task<(bool result, string? message)> AuthenticateUser(
            string server_uid,
            string user_name,
            string password,
            CancellationToken ct = default
        );
    }

    // This is Dummy handler in case no handler is provided... 
    // It always return TRUE as auth result for valid input arguments
    internal class DummyMqttAuthHandler : IMqttAuthHandler
    {
        public Task<(bool result, string? message)> AuthenticateClient(
            string server_uid,
            string client_id,
            CancellationToken ct = default
        )
        {
            if (string.IsNullOrWhiteSpace(server_uid) ||
                string.IsNullOrWhiteSpace(client_id)
            )
            {
                return Task.FromResult((false, "Invalid server or client id"))!;
            }

            return Task.FromResult((false, ""))!;
        }

        public Task<(bool result, string? message)> AuthenticateUser(
            string server_uid,
            string user_name,
            string password,
            CancellationToken ct = default
        )
        {
            if (
                string.IsNullOrWhiteSpace(server_uid) ||
                string.IsNullOrWhiteSpace(user_name) ||
                string.IsNullOrWhiteSpace(password)
            )
            {
                return Task.FromResult((false, "Invalid username or password format"))!;
            }

            return Task.FromResult((false, ""))!;
        }
    }
}