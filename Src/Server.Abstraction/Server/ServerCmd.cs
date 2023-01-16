
namespace Server
{
    public enum ServerCmd
    {
        stop,
        start,
        restart
    }

    public enum ServerGroupCmd
    {
        stop,
        start
    }

    public enum ServerGroupResult
    {
        done,
        doneWithErrors,
        failed
    }
}