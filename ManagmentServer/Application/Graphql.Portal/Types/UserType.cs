using Aplication.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql UserType
    /// </summary>
    public class UserType : ObjectType<GQL_User>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_User> descriptor)
        {

            descriptor.Field(e => e.Id).ID();

        }

        private class UserResolvers
        {

        }
    }
}