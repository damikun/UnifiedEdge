using Aplication.DTO;


namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql WebHookRecordType
    /// </summary>
    public class WebHookRecordType : ObjectType<GQL_WebHookRecord>
    {

        public WebHookRecordType()
        {

        }

        protected override void Configure(IObjectTypeDescriptor<GQL_WebHookRecord> descriptor)
        {
            descriptor
            .Field(e => e.Id)
            .ID();

            descriptor.Field(t => t.WebHookID).Type<IdType>().Resolve(ctx =>
            {
                IIdSerializer serializer = ctx.Service<IIdSerializer>();

                return serializer.Serialize(default, "GQL_WebHook", ctx.Parent<GQL_WebHookRecord>().WebHookID);
            });
        }
    }
}