using AutoMapper;
using Aplication.Mapping;
using Aplication.Interfaces;
using Aplication.Graphql.Interfaces;

namespace Aplication.DTO
{

    public abstract class GQL_ServerBase : GQL_IServer,
            IMapFrom<IServer>
    {
        public GQL_ServerBase()
        {

        }

        // <summary>
        /// ID
        /// </summary>
        public string Id { get; set; }

        // <summary>
        /// Name
        /// </summary>
        public string Name { get; set; }

        // <summary>
        /// Description
        /// </summary>
        public string? Description { get; set; }

        // <summary>
        /// Location
        /// </summary>
        public string? Location { get; set; }

        // <summary>
        /// IsEnabled
        /// </summary>
        public bool IsEnabled { get; set; }

        // <summary>
        /// isRunning
        /// </summary>
        public bool isRunning => State == GQL_ServerState.started;

        // <summary>
        /// Updated
        /// </summary>
        public DateTime Updated { get; set; }

        // <summary>
        /// Uptime
        /// </summary>
        public GQL_Uptime Uptime { get; set; }

        // <summary>
        /// State
        /// </summary>
        public GQL_ServerState State { get; set; }

        // <summary>
        /// Type
        /// </summary>
        public virtual GQL_ServerVariant Type { get; }

        // <summary>
        /// Configuration match
        /// </summary>
        public bool? IsConfigMatch { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<IServer, GQL_IServer>()
                .ConvertUsing(typeof(IServerToGqlIServer));
        }

        public class IServerToGqlIServer
        : ITypeConverter<IServer, GQL_IServer>
        {
            public GQL_IServer Convert(
                IServer source,
                GQL_IServer destination,
                ResolutionContext context)
            {
                if (source == null)
                    return null!;

                switch (source)
                {
                    case DTO_MqttServer:
                        return context.Mapper.Map<GQL_MqttServer>(source);
                    case DTO_OpcServer:
                        return context.Mapper.Map<GQL_OpcServer>(source);

                    default: throw new Exception("DomainToGraphqlIServerMapper => Not supported source type");
                }
            }
        }
    }
}