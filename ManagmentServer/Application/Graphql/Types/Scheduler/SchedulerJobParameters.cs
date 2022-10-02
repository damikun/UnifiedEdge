using Aplication.DTO.Scheduler;

namespace Aplication.GraphQL.Types
{

    /// <summary>
    /// Graphql SchedulerJobParameterType
    /// </summary>
    public class SchedulerJobParameterType : ObjectType<GQL_JobParameter>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_JobParameter> descriptor)
        {

        }

        private class SchedulerJobParameterResolvers
        {

        }
    }
}