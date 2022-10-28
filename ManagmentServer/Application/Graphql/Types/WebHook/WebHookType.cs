using Aplication.DTO;


namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql WebHookType
    /// </summary>
    public class WebHookType : ObjectType<GQL_WebHook>
    {

        public WebHookType()
        {

        }

        protected override void Configure(IObjectTypeDescriptor<GQL_WebHook> descriptor)
        {
            descriptor
            .Field(e => e.Id)
            .ID();
        }
    }
}