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

            descriptor.Field(e => e.ID).ID("SchedulerUid");

            descriptor.Field(e => e.JobDetail)
                .ResolveWith<Resolvers>(e => e.GetJobDetail(default!, default!, default));
        }

        private class Resolvers
        {
            public async Task<GQL_JobDetail> GetJobDetail(
            [Parent] GQL_FailedJob JobDetail,
            JobDetailByJobId_DataLoader grouploader,
            CancellationToken cancellationToken)
            {

                if (JobDetail != null && JobDetail.ID != null)
                {
                    return await grouploader.LoadAsync(JobDetail.ID, cancellationToken)!;
                }

                return null;
            }
        }
    }
}