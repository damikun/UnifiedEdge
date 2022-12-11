using AutoMapper;
using Domain.Server;
using Aplication.Mapping;
using Aplication.Interfaces;

namespace Aplication.DTO
{

    public class DTO_Server : IServer,
        IMapFrom<Domain.Server.ServerBase>
    {
        public DTO_Server()
        {

        }

        // <summary>
        /// ID
        /// </summary>
        public string Guid { get; set; }

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
        /// LoggingEnabled
        /// </summary>
        public bool LoggingEnabled { get; set; }

        // <summary>
        /// Updated
        /// </summary>
        public DateTime Updated { get; set; }

        // <summary>
        /// Created
        /// </summary>
        public DateTime Created { get; set; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<ServerBase, DTO_Server>()
                .IncludeAllDerived()
                .ForMember(dest => dest.Guid, opt => opt.MapFrom(src => src.UID))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.LoggingEnabled, opt => opt.MapFrom(src => src.EnableLogging))
                .ForMember(dest => dest.IsEnabled, opt => opt.MapFrom(src => src.IsEnabled))
                .ReverseMap();

            profile.CreateMap<ServerBase, IServer>()
                .ConvertUsing(typeof(ServerToIServer));
        }

        public class ServerToIServer
            : ITypeConverter<ServerBase, IServer>
        {
            public IServer Convert(
                ServerBase source,
                IServer destination,
                ResolutionContext context
            )
            {
                if (source == null)
                    return null!;

                switch (source)
                {
                    case MqttServer:
                        return context.Mapper.Map<DTO_MqttServer>(source);
                    case OpcServer:
                        return context.Mapper.Map<DTO_OpcServer>(source);
                    default:
                        throw new Exception(
                        string.Format(
                            "Unsupported Map from {0} to {1}",
                            typeof(ServerBase),
                            typeof(IServer)
                        )
                    );
                }
            }
        }
    }
}
