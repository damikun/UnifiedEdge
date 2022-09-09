using AutoMapper;
using Aplication.DTO;
using Aplication.Graphql.Interfaces;
using Aplication.Interfaces;
using Server.Domain;

namespace Aplication.Mapping
{
    public class Server_Map_Profile : Profile
    {
        public Server_Map_Profile()
        {
            CreateMap<Server.Domain.MqttServer, DTO_MqttServer>()
                .IncludeAllDerived()
                .ForMember(dest => dest.Guid, opt => opt.MapFrom(src => src.Guid))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.Port, opt => opt.MapFrom(src => src.Port))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ReverseMap();

            CreateMap<DTO_MqttServer, GQL_MqttServer>()
                .IncludeAllDerived()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Guid))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.Port, opt => opt.MapFrom(src => src.Port))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ReverseMap();

            CreateMap<Server.Domain.OpcServer, DTO_OpcServer>()
                .IncludeAllDerived()
                .ForMember(dest => dest.Guid, opt => opt.MapFrom(src => src.Guid))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ReverseMap();

            CreateMap<DTO_OpcServer, GQL_OpcServer>()
                .IncludeAllDerived()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Guid))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ReverseMap();

            CreateMap(typeof(IServer), typeof(GQL_IServer))
                .ConvertUsing(typeof(DomainToGraphqlIServer));

            CreateMap(typeof(ServerBase), typeof(IServer))
                .ConvertUsing(typeof(ServerToIServer));

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

        // public class DomainTolIServer
        //     : ITypeConverter<IServer, GQL_IServer>
        // {
        //     public GQL_IServer Convert(
        //         IServer source,
        //         GQL_IServer destination,
        //         ResolutionContext context)
        //     {
        //         if (source == null)
        //             return null!;

        //         switch (source)
        //         {
        //             case DTO_MqttServer:
        //                 return context.Mapper.Map<GQL_MqttServer>(source);
        //             default: throw new Exception("Not supported source type");
        //         }
        //     }
        // }
    }
}