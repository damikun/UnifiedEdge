using MediatR;
using AutoMapper;
using Aplication.GraphQL.DTO;
using HotChocolate.Resolvers;
using Aplication.DTO.Scheduler;
using Aplication.CQRS.Queries.Scheduler;

namespace Aplication.GraphQL.Types
{

    /// <summary>
    /// Graphql SchedulerJobsStatisticType
    /// </summary>
    public class SchedulerJobsStatisticType : ObjectType<GQL_JobsStatistic>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_JobsStatistic> descriptor)
        {
            descriptor.ImplementsNode().IdField(t => t.ID).ResolveNode(async (ctx, id) =>
                ctx.Service<IMapper>().Map<DTO_SchedulerStatistic, GQL_JobsStatistic>(
                    await ctx.Service<IMediator>().Send(new SchedulerGetStatistic())
                )
            );

            descriptor.Field(e => e.RecentFailedByDate).Resolve(async (IResolverContext context) =>
            {
                IMediator mediator = context.Service<IMediator>();

                return await mediator.Send(new SchedulerFailedStatitic());
            });

            descriptor.Field(e => e.RecentSucceededByDate).Resolve(async (IResolverContext context) =>
            {
                IMediator mediator = context.Service<IMediator>();

                return await mediator.Send(new SchedulerSuccessStatitic());
            });
        }
    }
}
