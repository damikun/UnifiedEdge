
namespace Aplication.Graphql.Errors
{

    [InterfaceType("ResultError")]
    public interface IResultError
    {
        string ErrorType { get; }

        string Message { get; }
    }

}