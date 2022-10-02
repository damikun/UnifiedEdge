using MediatR;
using AutoMapper;
using Aplication.DTO.Scheduler;
using Aplication.Graphql.DataLoaders;
using Aplication.CQRS.Queries.Scheduler;

namespace Aplication.GraphQL.Types
{
    /// <summary>
    /// Graphql RecurringJobType
    /// </summary>
    public class SchedulerRecurringJobType : ObjectType<GQL_RecurringJob>
    {
        protected override void Configure(IObjectTypeDescriptor<GQL_RecurringJob> descriptor)
        {
            descriptor.ImplementsNode().IdField(t => t.ID).ResolveNode(async (ctx, id) =>
                ctx.Service<IMapper>().Map<DTO_RecurringJob, GQL_RecurringJob>(
                    await ctx.Service<IMediator>().Send(new SchedulerGetRecurringJobById() { jobid = id }))
            );

            descriptor.Field(t => t.LastJobState).Type<ScheduleStateEnumType>().Resolve((ctx) =>
            {
                string state = ctx.Parent<GQL_RecurringJob>().LastJobState;

                return state.ToEnum<GQL_ScheduleState>();
            });

            descriptor.Field(e => e.JobDetail)
                .ResolveWith<Resolvers>(e => e.GetJobDetail(default!, default!, default));

        }

        private class Resolvers
        {
            public async Task<GQL_JobDetail> GetJobDetail(
                GQL_RecurringJob jobdetail,
                JobDetailByJobId_DataLoader grouploader,
                CancellationToken cancellationToken)
            {

                if (jobdetail.LastJobId != null && jobdetail.LastJobId != "")
                {
                    return await grouploader.LoadAsync(jobdetail.LastJobId, cancellationToken)!;
                }

                return null;
            }
        }
    }
}


//