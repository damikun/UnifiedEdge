using MediatR;
using AutoMapper;
using Aplication.DTO.Scheduler;
using Aplication.Graphql.DataLoaders;
using Aplication.CQRS.Queries.Scheduler;

namespace Aplication.GraphQL.Types
{
    /// <summary>
    /// Graphql FailedJobType
    /// </summary>
    public class FailedJobType : ObjectType<GQL_FailedJob>
    {
        protected override void Configure(IObjectTypeDescriptor<GQL_FailedJob> descriptor)
        {
            descriptor.ImplementsNode().IdField(t => t.ID).ResolveNode(async (ctx, id) =>
                ctx.Service<IMapper>().Map<DTO_FailedJob, GQL_FailedJob>(
                    await ctx.Service<IMediator>().Send(new SchedulerGetFailedJobById() { jobid = id }))
            );

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