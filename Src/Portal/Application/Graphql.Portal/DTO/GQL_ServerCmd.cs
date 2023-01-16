
namespace Aplication.DTO
{
    public enum GQL_ServerCmd
    {
        stop,
        start,
        restart
    }

    public enum GQL_ServerGroupCmd
    {
        stop,
        start
    }

    public enum GQL_ServerGroupResult
    {
        done,
        doneWithErrors,
        failed
    }
}