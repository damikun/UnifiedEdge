using Aplication.DTO;
using Server.Mqtt.DTO;

namespace Aplication.Graphql.Types
{

    /// <summary>
    /// Graphql MqttMessageType
    /// </summary>
    public class MqttMessageType : ObjectType<GQL_MqttMessage>
    {

        protected override void Configure(IObjectTypeDescriptor<GQL_MqttMessage> descriptor)
        {
            descriptor.Field(e => e.Id)
            .ID();

            descriptor.Field(e => e.ServerUid)
            .ID(nameof(GQL_MqttServer));

            descriptor.Field(e => e.ClientUid)
            .ID(nameof(GQL_MqttClient));

            descriptor.Field(e => e.TopicUid)
            .ID(nameof(GQL_MqttTopic));

            descriptor.Field(e => e.PayloadUtf8Str)
            .Resolve(ctx =>
            {

                var payload = ctx.Parent<GQL_MqttMessage>().Payload;

                if (payload == null)
                {
                    return null;
                }

                try
                {
                    return System.Text.Encoding.UTF8.GetString(payload, 0, payload.Length);
                }
                catch
                {
                    return null;
                }

            });

            descriptor.Field(e => e.isJsonPayload)
            .ResolveWith<MessageResolvers>(e =>
                e.isJson(default!)
            );

            descriptor.Field(e => e.isTextPayload)
            .ResolveWith<MessageResolvers>(e =>
                e.isText(default!)
            );

            descriptor.Field(e => e.isXmlPayload)
            .ResolveWith<MessageResolvers>(e =>
                e.isXml(default!)
            );
        }

        public class MessageResolvers
        {
            public bool isJson([Parent] GQL_MqttMessage message)
            {
                return isContentTypeOf("application/json", message!) ||
                containsType("json", message!);
            }

            public bool isText([Parent] GQL_MqttMessage message)
            {
                return isContentTypeOf("text/html", default!) ||
                containsType("text", default!);
            }

            public bool isXml([Parent] GQL_MqttMessage message)
            {
                return isContentTypeOf("text/xml", default!) ||
                isContentTypeOf("application/xml", default!) ||
                containsType("xml", default!);
            }

            private bool isContentTypeOf(
                string content_type,
                GQL_MqttMessage message
            )
            {
                if (message is null)
                {
                    return false;
                }

                if (content_type is not null && message.ContentType is not null)
                {
                    return message.ContentType.Equals(
                        content_type,
                        StringComparison.OrdinalIgnoreCase
                    );
                }

                return false;
            }

            private bool containsType(
                string type,
                GQL_MqttMessage message
            )
            {
                if (message is null)
                {
                    return false;
                }

                if (type is not null && message.ContentType is not null)
                {
                    return message.ContentType.Contains(
                        type,
                        StringComparison.OrdinalIgnoreCase
                    );
                }

                return false;
            }
        }
    }
}