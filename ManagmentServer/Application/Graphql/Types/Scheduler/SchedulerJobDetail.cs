using Aplication.DTO.Scheduler;
using Aplication.Graphql.DataLoaders;

namespace Aplication.GraphQL.Types
{

    /// <summary>
    /// Graphql SchedulerJobDetailType
    /// </summary>
    public class SchedulerJobDetailType : ObjectType<GQL_JobDetail>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_JobDetail> descriptor)
        {
            descriptor.Field(e => e.LastState)
            .ResolveWith<Resolvers>(e => e.GetJobLastState(default!, default!, default));

            descriptor.Field(e => e.MethodCall)
            .ResolveWith<Resolvers>(e => e.GetJobMethodCall(default!, default!, default));
        }

        private class Resolvers
        {
            public async Task<string?> GetJobLastState(
            GQL_JobDetail jobdetail,
            JobStateByJobId_DataLoader grouploader,
            CancellationToken cancellationToken) =>
                await grouploader.LoadAsync(jobdetail.JobId, cancellationToken);

            public async Task<string?> GetJobMethodCall(
            GQL_JobDetail jobdetail,
            JobMethodByJobId_DataLoader grouploader,
            CancellationToken cancellationToken) =>
                await grouploader.LoadAsync(jobdetail.JobId, cancellationToken);
        }
    }
}
