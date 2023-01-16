using Aplication.DTO;
using Aplication.Graphql.DataLoaders;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql NoteType
    /// </summary>
    public class NoteType : ObjectType<GQL_Note>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_Note> descriptor)
        {
            descriptor.Field(e => e.Id).ID();

            descriptor.Field(e => e.CreatedBy)
            .Type<UserType>()
            .ResolveWith<NoteResolvers>(e =>
                e.GetCreatedByUser(default!, default!, default)
            );

            descriptor.Field(e => e.Updatedby)
            .Type<UserType>()
            .ResolveWith<NoteResolvers>(e =>
                e.GetUpdatedByUser(default!, default!, default)
            );
        }

        private class NoteResolvers
        {
            public async Task<GQL_User?> GetCreatedByUser(
            UserByIdDataLoader loader,
            [Parent] GQL_Note source,
            CancellationToken cancellationToken)
            {
                if (string.IsNullOrWhiteSpace(source.CreatedBy))
                {
                    return null;
                }

                try
                {
                    return await loader.LoadAsync(
                        source.CreatedBy,
                        cancellationToken
                    );
                }
                catch
                {
                    return null;
                }
            }

            public async Task<GQL_User?> GetUpdatedByUser(
            UserByIdDataLoader loader,
            [Parent] GQL_Note source,
            CancellationToken cancellationToken)
            {
                if (string.IsNullOrWhiteSpace(source.Updatedby))
                {
                    return null;
                }

                try
                {
                    return await loader.LoadAsync(
                            source.Updatedby,
                            cancellationToken
                        );
                }
                catch
                {
                    return null;
                }
            }
        }
    }
}