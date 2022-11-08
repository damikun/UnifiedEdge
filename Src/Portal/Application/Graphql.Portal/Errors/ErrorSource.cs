
namespace Aplication.Graphql.Errors
{
    public class ErrorSource
    {
        public string? Property { get; set; }
        public string? PropertyNormalised
        {
            get
            {
                if (Property == null)
                {
                    return null;
                }

                return Property.ToLowerInvariant();

            }
        }
        public string? Message { get; set; }
    }
}