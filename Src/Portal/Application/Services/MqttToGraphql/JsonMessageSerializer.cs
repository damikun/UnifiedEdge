using Newtonsoft.Json;

namespace Aplication.Extensions.Mqtt;

public class JsonMessageSerializer : IMqttMessageSerializer
{
    private readonly JsonSerializerSettings _settings = new()
    {
        TypeNameHandling = TypeNameHandling.All,
        TypeNameAssemblyFormatHandling = TypeNameAssemblyFormatHandling.Simple,
        Formatting = Formatting.Indented,
    };

    public string Serialize<TMessage>(TMessage message) =>
        JsonConvert.SerializeObject(message, _settings);

    public TMessage Deserialize<TMessage>(string serializedMessage) =>
        JsonConvert.DeserializeObject<TMessage>(serializedMessage, _settings);
}
