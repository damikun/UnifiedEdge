using Server;
using AutoMapper;
using Aplication.Mapping;

namespace Aplication.DTO
{
    public class GQL_ServerStateChangedNotification : IMapFrom<ServerStateChangedEvent>
    {
        public string Server_Uid { get; set; }

        public GQL_ServerState State { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ServerStateChangedEvent, GQL_ServerStateChangedNotification>()
            .ForMember(dest => dest.Server_Uid, opt => opt.MapFrom(src => src.UID))
            .ForMember(dest => dest.State, opt => opt.MapFrom(src => src.State));
        }
    }
}