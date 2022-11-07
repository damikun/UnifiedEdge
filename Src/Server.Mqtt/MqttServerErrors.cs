
namespace Server.Mqtt
{
    public class ServerNotRunningException : Exception
    {
        public ServerNotRunningException() : base("Server is not running")
        {

        }
    }
}