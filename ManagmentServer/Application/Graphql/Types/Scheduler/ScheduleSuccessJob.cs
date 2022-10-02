using MediatR;
using AutoMapper;
using Aplication.DTO.Scheduler;
using Aplication.Graphql.DataLoaders;
using Aplication.CQRS.Queries.Scheduler;

namespace Aplication.GraphQL.Types
{

    /// <summary>
    /// Graphql SuccessJobType
    /// </summary>
    public class SchedulerSuccessJobType : ObjectType<GQL_SuccessJob>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_SuccessJob> descriptor)
        {
            descriptor.ImplementsNode().IdField(t => t.ID).ResolveNode(async (ctx, id) =>
                ctx.Service<IMapper>().Map<DTO_SuccessJob, GQL_SuccessJob>(
                    await ctx.Service<IMediator>().Send(new SchedulerGetSuccessJobById() { jobid = id }))
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