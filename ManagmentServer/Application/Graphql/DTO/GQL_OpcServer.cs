using Aplication.Graphql.Interfaces;
using Aplication.Mapping;
using AutoMapper;

namespace Aplication.DTO
{
    public class GQL_OpcServer : GQL_ServerBase, GQL_IServer, IMapFrom<DTO_OpcServer>
    {
        public GQL_OpcServer()
        {

        }

        public override GQL_ServerVariant Type
        {
            get
            {
                return GQL_ServerVariant.opc;
            }
        }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<DTO_OpcServer, GQL_OpcServer>()
                .IncludeAllDerived()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Guid))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ReverseMap();
        }
    }
}