using Aplication.DTO;
using Aplication.Graphql.DataLoaders;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql UserType
    /// </summary>
    public class UserType : ObjectType<GQL_User>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_User> descriptor)
        {

            descriptor.ImplementsNode().IdField(t => t.Id)
            .ResolveNode((ctx, id) =>
                 ctx.DataLoader<UserByIdDataLoader>()
                 .LoadAsync(id, ctx.RequestAborted)!);


        }

        private class UserResolvers
        {

        }
    }
}