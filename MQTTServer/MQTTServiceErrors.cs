

namespace Server
{
    public class ServerNotRunningException : Exception
    {
        public ServerNotRunningException() : base("Server is not running")
        {

        }
    }
}