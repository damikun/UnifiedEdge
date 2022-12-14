
namespace Aplication.Core.Pagination
{
    public readonly struct CursorArguments
    {
        public CursorArguments()
        {
            First = null;
            Last = null;
            After = null;
            Before = null;
        }

        public CursorArguments(
            int? first = null,
            int? last = null,
            string? after = null,
            string? before = null)
        {
            First = first;
            Last = last;
            After = after;
            Before = before;
        }

        public int? First { get; }
        public int? Last { get; }
        public string? After { get; }
        public string? Before { get; }
    }
}