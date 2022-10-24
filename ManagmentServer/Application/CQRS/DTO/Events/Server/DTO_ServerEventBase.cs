using AutoMapper;
using Domain.Event;
using Aplication.Mapping;
using Domain.Server.Events;

namespace Aplication.DTO
{
    public class DTO_ServerEventBase : DTO_IServerEventLog,
    IMapFrom<ServerEventBase>
    {
#nullable disable
        public string ServerUid { get; set; }
#nullable enable
        public long ID { get; set; }
#nullable disable
        public string Name { get; set; }
#nullable enable
        public string? Description { get; set; }

        public EventType Type { get; set; }

        public DateTime TimeStamp { get; set; } = DateTime.Now;

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ServerEventBase, DTO_ServerEventBase>()
                .ForMember(dest => dest.ID, opt => opt.MapFrom(src => src.ID))
                .ForMember(dest => dest.ServerUid, opt => opt.MapFrom(src => src.ServerUid))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.TimeStamp, opt => opt.MapFrom(src => src.TimeStamp))
                .ReverseMap();

            profile.CreateMap<ServerEventBase, DTO_IServerEventLog>()
                .ConvertUsing(typeof(ServerLogDomainToInterface));
        }


        public class ServerLogDomainToInterface
        : ITypeConverter<ServerEventBase, DTO_IServerEventLog>
        {
            public DTO_IServerEventLog Convert(
                ServerEventBase source,
                DTO_IServerEventLog destination,
                ResolutionContext context)
            {
                if (source == null)
                    return null!;

                switch (source)
                {
                    case ServerClientConnectedEvent:
                        return context.Mapper.Map<DTO_ClientConnected>(source);
                    case ServerClientDisconnectedEvent:
                        return context.Mapper.Map<DTO_ClientDisconnected>(source);
                    case ServerConfigDiffEvent:
                        return context.Mapper.Map<DTO_ServerConfigDiffEvent>(source);
                    case ServerErrorEvent:
                        return context.Mapper.Map<DTO_ServerErrorEvent>(source);
                    case ServerInfoEvent:
                        return context.Mapper.Map<DTO_ServerInfoEvent>(source);
                    case ServerStateChangedEvent:
                        var eeee = context.Mapper.Map<DTO_ServerStateChangedEvent>(source);
                        return context.Mapper.Map<DTO_ServerStateChangedEvent>(source);

                    default: throw new Exception("DBServerEventToDtoEvent => Not supported source type");
                }
            }
        }

    }
}