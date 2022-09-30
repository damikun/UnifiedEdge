using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using Domain.Server.Events;
using Aplication.Graphql.Interfaces;

namespace Aplication.Mapping
{
    public class Server_Map_Profile : Profile
    {
        public Server_Map_Profile()
        {
            CreateMap(typeof(ServerBase), typeof(ServerType))
                .ConvertUsing(typeof(ServerToEnumType));

            CreateMap(typeof(ServerEventBase), typeof(DTO_IServerEventLog))
                .ConvertUsing(typeof(MapServerEventToDtoInterface));

            CreateMap(typeof(DTO_IServerEventLog), typeof(GQL_IServerEventUnion))
                .ConvertUsing(typeof(MapServerLogsDtoToGqlInterfaces));
        }

        public class MapServerLogsDtoToGqlInterfaces
            : ITypeConverter<DTO_IServerEventLog, GQL_IServerEventUnion>
        {
            public GQL_IServerEventUnion Convert(
                DTO_IServerEventLog source,
                GQL_IServerEventUnion destination,
                ResolutionContext context)
            {
                if (source == null)
                    return null!;

                switch (source)
                {
                    case DTO_ClientConnected e:
                        return context.Mapper.Map<GQL_ClientConnected>(e);
                    case DTO_ServerConfigDiffEvent e:
                        return context.Mapper.Map<GQL_ServerConfigDiffEvent>(e);
                    case DTO_ServerErrorEvent e:
                        return context.Mapper.Map<GQL_ServerErrorEvent>(e);
                    case DTO_ServerInfoEvent e:
                        return context.Mapper.Map<GQL_ServerInfoEvent>(e);
                    case DTO_ServerStateChangedEvent e:
                        return context.Mapper.Map<GQL_ServerStateChangedEvent>(e);

                    default: throw new Exception("MapServerEventToDtoInterface => Not supported source type");
                }
            }
        }


        public class MapServerEventToDtoInterface
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
                    case ServerClientConnectedEvent e:
                        return context.Mapper.Map<DTO_ClientConnected>(e);
                    case ServerConfigDiffEvent e:
                        return context.Mapper.Map<DTO_ServerConfigDiffEvent>(e);
                    case ServerErrorEvent e:
                        return context.Mapper.Map<DTO_ServerErrorEvent>(e);
                    case ServerInfoEvent e:
                        return context.Mapper.Map<DTO_ServerInfoEvent>(e);
                    case ServerStateChangedEvent e:
                        return context.Mapper.Map<DTO_ServerStateChangedEvent>(e);

                    default: throw new Exception("MapServerEventToDtoInterface => Not supported source type");
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
    }
}