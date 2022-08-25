
using Aplication.Graphql.Mutations;

namespace Aplication
{

    public class MutationType : ObjectType<Mutation>
    {
        protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor)
        {
            // Extend query hire using code-first
        }
    }
}
