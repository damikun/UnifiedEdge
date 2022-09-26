using System.Net.NetworkInformation;

namespace Aplication.Graphql.Types
{
    public class AdapterInterfaceEnumType : EnumType<NetworkInterfaceType>
    {
        public AdapterInterfaceEnumType() { }

        protected override void Configure(IEnumTypeDescriptor<NetworkInterfaceType> descriptor)
        {


        }
    }
}