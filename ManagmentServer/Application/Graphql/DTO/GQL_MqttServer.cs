namespace Aplication.DTO
{
    public class GQL_MqttServer : GQL_ServerBase
    {
        public GQL_MqttServer()
        {

        }

        public override GQL_ServerVariant Type
        {
            get
            {
                return GQL_ServerVariant.mqtt;
            }
        }
    }
}