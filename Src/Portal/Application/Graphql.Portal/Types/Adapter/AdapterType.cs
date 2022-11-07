using MediatR;
using AutoMapper;
using Aplication.DTO;
using Aplication.CQRS.Queries;
using HotChocolate.Types.Pagination;

namespace Aplication.Graphql.Types
{
    public class AdapterType : ObjectType<GQL_Adapter>
    {
        public AdapterType() { }

        protected override void Configure(
            IObjectTypeDescriptor<GQL_Adapter> descriptor
        )
        {
            // descriptor.Field(e => e.Id).ID();

            descriptor.ImplementsNode()
            .IdField(e => e.Id)
            .ResolveNodeWith<AdapterResolvers>(
                e => e.GetAdapterAsync(default!, default!, default!, default!)
            );

            descriptor
            .Field(e => e.Logs)
            .UseConnection(typeof(GQL_AdapterLog))
            .Resolve(async (ctx) =>
            {
                var mediatr = ctx.Service<IMediator>();
                var mapper = ctx.Service<IMapper>();

                var arguments = ctx.GetPaggingArguments();

                var edges = await mediatr.Send(
                    new GetAdapterLogs(
                        arguments,
                        ctx.Parent<GQL_Adapter>().Id
                    )
                );

                return mapper.Map<Connection<GQL_AdapterLog>>(edges);
            });
        }

        private class AdapterResolvers
        {
            public async Task<GQL_Adapter> GetAdapterAsync(
                string id,
                [Service] IMediator mediator,
                [Service] IMapper mapper,
                CancellationToken cancellationToken
            )
            {
                var result = await mediator.Send(
                    new GetAdapterById()
                    {
                        ID = id
                    }
                );

                return mapper.Map<GQL_Adapter>(result);
            }
        }

    }
}