using static Aplication.Graphql.Mutations.ServerMutations;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql RemoveServerPayloadType 
    /// </summary>
    public class RemoveServerPayloadType : ObjectType<RemoveServerPayload>
    {
        protected override void Configure(IObjectTypeDescriptor<RemoveServerPayload> descriptor)
        {
            descriptor
            .Field(e => e.removed_id)
            .Type<IdType>()
            .Resolve(ctx =>
            {
                IIdSerializer serializer = ctx.Service<IIdSerializer>();

                return serializer.Serialize(
                    default!,
                    ctx.Parent<RemoveServerPayload>().typeName!,
                    ctx.Parent<RemoveServerPayload>().removed_id!
                )!;
            });

            descriptor.Field(e => e.typeName).Ignore();

        }
    }
}