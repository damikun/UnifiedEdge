using Aplication.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql TokenType
    /// </summary>
    public class TokenType : ObjectType<GQL_Token>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_Token> descriptor)
        {

            descriptor.Field(e => e.Id).ID();
        }

    }
}