using static Aplication.Graphql.Mutations.ServerMutations;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql RemoveServerPayloadType 
    /// </summary>
    public class RemoveServerDataType : ObjectType<RemoveServerData>
    {
        protected override void Configure(IObjectTypeDescriptor<RemoveServerData> descriptor)
        {
            descriptor
            .Field(e => e.removed_id)
            .Type<IdType>()
            .Resolve(ctx =>
            {
                IIdSerializer serializer = ctx.Service<IIdSerializer>();

                return serializer.Serialize(
                    default!,
                    ctx.Parent<RemoveServerData>().typeName!,
                    ctx.Parent<RemoveServerData>().removed_id!
                )!;
            });

            descriptor.Field(e => e.typeName).Ignore();

        }
    }
}