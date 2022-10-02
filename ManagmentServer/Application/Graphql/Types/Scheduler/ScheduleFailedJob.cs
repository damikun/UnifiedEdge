using Aplication.DTO.Scheduler;
using Aplication.Graphql.DataLoaders;

namespace Aplication.GraphQL.Types
{
    /// <summary>
    /// Graphql FailedJobType
    /// </summary>
    public class FailedJobType : ObjectType<GQL_FailedJob>
    {
        protected override void Configure(IObjectTypeDescriptor<GQL_FailedJob> descriptor)
        {

            descriptor.Field(e => e.ID).ID();

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