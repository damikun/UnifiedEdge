using Aplication.Mapping;
using AutoMapper;

namespace Aplication.DTO
{

    public class DTO_OpcServer : DTO_Server, IMapFrom<Domain.Server.OpcServer>
    {
        public DTO_OpcServer()
        {

        }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Server.OpcServer, DTO_OpcServer>()
                .IncludeAllDerived()
                .ReverseMap();
        }

    }
}