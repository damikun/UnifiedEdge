using AutoMapper;
using Aplication.Services;
using Aplication.Services.Historian;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql HistorianRecordType
    /// </summary>
    public class HistorianRecordType : ObjectType<HistorianRecord>
    {

        public HistorianRecordType(
            IRuntimeService runtime,
            IMapper mapper)
        {
        }

        protected override void Configure(IObjectTypeDescriptor<HistorianRecord> descriptor)
        {
            descriptor.Field(e => e.Value).Type<AnyType>();

            descriptor.Field(e => e.TimeStamp).Type<DateTimeType>();
        }

    }
}