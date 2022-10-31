
using Aplication.Graphql.Queries;

namespace Aplication
{

    public class PublicQueryType : ObjectType<Query>
    {
        protected override void Configure(IObjectTypeDescriptor<Query> descriptor)
        {
            // Extend query hire using code-first
        }
    }
}
