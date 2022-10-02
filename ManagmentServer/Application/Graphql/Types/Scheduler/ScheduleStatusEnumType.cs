using Aplication.DTO.Scheduler;

namespace Aplication.GraphQL.Types
{


    public class ScheduleStateEnumType : EnumType<GQL_ScheduleState>
    {

        protected override void Configure(IEnumTypeDescriptor<GQL_ScheduleState> descriptor)
        {

            descriptor.Value(GQL_ScheduleState.Awaiting)
                .Name("Awaiting")
                .Description("Awaiting");
            descriptor.Value(GQL_ScheduleState.Deleted)
                .Name("Deleted")
                .Description("Deleted");
            descriptor.Value(GQL_ScheduleState.Enqueued)
                .Name("Enqueued")
                .Description("Enqueued");
            descriptor.Value(GQL_ScheduleState.Failed)
                .Name("Failed")
                .Description("Failed");
            descriptor.Value(GQL_ScheduleState.Processing)
                .Name("Processing")
                .Description("Processing");
            descriptor.Value(GQL_ScheduleState.Scheduled)
                .Name("Scheduled")
                .Description("Scheduled");
            descriptor.Value(GQL_ScheduleState.Succeeded)
                .Name("Succeeded")
                .Description("Succeeded");
        }
    }
}


