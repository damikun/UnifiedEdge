using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using Aplication.Interfaces;
using Aplication.Graphql.Interfaces;

namespace Aplication.Mapping
{
    public class Server_Map_Profile : Profile
    {
        public Server_Map_Profile()
        {
            // CreateMap<Domain.Server.MqttServer, DTO_MqttServer>()
            //     .IncludeAllDerived()
            //     .ForMember(dest => dest.Guid, opt => opt.MapFrom(src => src.UID))
            //     .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            //     .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            //     .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
            //     .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
            //     .ReverseMap();

            // CreateMap<DTO_MqttServer, GQL_MqttServer>()
            //     .IncludeAllDerived()
            //     .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Guid))
            //     .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            //     .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            //     .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
            //     .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
            //     .ReverseMap();

            // CreateMap<Domain.Server.OpcServer, DTO_OpcServer>()
            //     .IncludeAllDerived()
            //     .ForMember(dest => dest.Guid, opt => opt.MapFrom(src => src.UID))
            //     .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            //     .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            //     .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
            //     .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
            //     .ReverseMap();

            // CreateMap<DTO_OpcServer, GQL_OpcServer>()
            //     .IncludeAllDerived()
            //     .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Guid))
            //     .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
            //     .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
            //     .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
            //     .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
            //     .ReverseMap();

            CreateMap(typeof(IServer), typeof(GQL_IServer))
                .ConvertUsing(typeof(DomainToGraphqlIServer));

            CreateMap(typeof(ServerBase), typeof(IServer))
                .ConvertUsing(typeof(ServerToIServer));

            CreateMap(typeof(ServerBase), typeof(ServerType))
                .ConvertUsing(typeof(ServerToEnumType));

            CreateMap(typeof(ServerCfgBase), typeof(Server.IServerCfg))
                .ConvertUsing(typeof(DbCfgToServerCfg));

        }

        public class DbCfgToServerCfg
            : ITypeConverter<ServerCfgBase, Server.IServerCfg>
        {
            public Server.IServerCfg Convert(
                ServerCfgBase source,
                Server.IServerCfg destination,
                ResolutionContext context)
            {
                switch (source)
                {
                    case Domain.Server.MqttServerCfg mqtt_cfg:

                        return new Server.Mqtt.MqttServerCfg()
                        {
                            Server_UID = mqtt_cfg.ServerUID,
                            TimeStamp = mqtt_cfg.TimeStamp,
                            IsEnabled = mqtt_cfg.IsEnabled
                        };

                    default:
                        throw new Exception(
                        string.Format("Unsupported type: {0}", source.GetType().ToString())
                    );
                }

            }
        }
        public class ServerToEnumType
            : ITypeConverter<ServerBase, ServerType>
        {
            public ServerType Convert(
                ServerBase source,
                ServerType destination,
                ResolutionContext context)
            {
                return source.Type;
            }
        }

        public class ServerToIServer
            : ITypeConverter<ServerBase, IServer>
        {
            public IServer Convert(
                ServerBase source,
                IServer destination,
                ResolutionContext context)
            {
                if (source == null)
                    return null!;

                switch (source)
                {
                    case MqttServer:
                        return context.Mapper.Map<DTO_MqttServer>(source);
                    case OpcServer:
                        return context.Mapper.Map<DTO_OpcServer>(source);
                    default: throw new Exception("Not supported source type");
                }
            }
        }

        public class DomainToGraphqlIServer
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