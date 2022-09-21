using Aplication.Interfaces;
using Aplication.Mapping;
using AutoMapper;

namespace Aplication.DTO
{

    public class DTO_Server : IServer, IMapFrom<Domain.Server.ServerBase>
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
        /// Updated
        /// </summary>
        public DateTime Updated { get; set; }

        // <summary>
        /// Created
        /// </summary>
        public DateTime Created { get; set; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Server.ServerBase, DTO_Server>()
                .IncludeAllDerived()
                .ForMember(dest => dest.Guid, opt => opt.MapFrom(src => src.UID))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Location, opt => opt.MapFrom(src => src.Location))
                .ForMember(dest => dest.Updated, opt => opt.MapFrom(src => src.Updated))
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created))
                .ForMember(dest => dest.IsEnabled, opt => opt.MapFrom(src => src.IsEnabled))
                .ReverseMap();
        }

    }
}