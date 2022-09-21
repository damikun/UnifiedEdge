using Server;
using AutoMapper;
using Aplication.DTO;
using Aplication.Core;
using Aplication.Core.Pagination;
using HotChocolate.Types.Pagination;

namespace Aplication.Mapping
{

    public class DomainEdgeToGraphqlEdge<TSource, TDestination>
        : ITypeConverter<EdgeBase<TSource>, Edge<TDestination>>
            where TDestination : class where TSource : class
    {
        public Edge<TDestination> Convert(
            EdgeBase<TSource> source,
            Edge<TDestination> destination,
            ResolutionContext context)
        {

            if (source.Node == null)
            {
                return new Edge<TDestination>(null!, source.Cursor);
            }

            if (source.Node is TDestination)
            {
                new Edge<TDestination>(
                    (source.Node as TDestination)!,
                     source.Cursor
                );
            }

            var mapped_node = context.Mapper.Map<TDestination>(source.Node);

            return new Edge<TDestination>(mapped_node, source.Cursor);
        }
    }

    public class EdgeToEdge<TSource, TDestination>
        : ITypeConverter<Edge<TSource>, Edge<TDestination>>
            where TSource : class, TDestination
            where TDestination : class
    {
        public Edge<TDestination> Convert(
            Edge<TSource> source,
            Edge<TDestination> destination,
            ResolutionContext context)
        {

            if (source.Node == null)
            {
                return new Edge<TDestination>(null!, source.Cursor);
            }

            var mapped_node = source.Node;

            return new Edge<TDestination>(mapped_node, source.Cursor);
        }
    }

    public class DomainPageInfoToGraphqlPageInfo
        : ITypeConverter<PageInfo, ConnectionPageInfo>
    {
        public ConnectionPageInfo Convert(
            PageInfo source,
            ConnectionPageInfo destination,
            ResolutionContext context)
        {
            if (source == null)
            {
                return null!;
            }

            return new ConnectionPageInfo(
                source.HasNextPage,
                source.HasPreviousPage,
                source.StartCursor,
                source.EndCursor
            );
        }
    }

    public class MqttServerStateToGqlState
        : ITypeConverter<ServerState, GQL_ServerState>
    {
        public GQL_ServerState Convert(
            ServerState source,
            GQL_ServerState destination,
            ResolutionContext context)
        {
            switch (source)
            {
                case ServerState.started: return GQL_ServerState.started;
                case ServerState.restarting: return GQL_ServerState.restarting;
                case ServerState.starting: return GQL_ServerState.starting;
                case ServerState.stopping: return GQL_ServerState.stopping;
                case ServerState.stopped: return GQL_ServerState.stopped;
                case ServerState.disabled: return GQL_ServerState.disabled;

                default: return GQL_ServerState.undefined;
            }
        }
    }


    public class Graphql_Map_Profile : Profile
    {
        public Graphql_Map_Profile()
        {
            CreateMap(typeof(EdgeBase<>), typeof(Edge<>))
                .ConvertUsing(typeof(DomainEdgeToGraphqlEdge<,>));

            // CreateMap(typeof(Edge<>), typeof(Edge<>))
            //     .ConvertUsing(typeof(EdgeToEdge<,>));

            CreateMap<PageInfo, ConnectionPageInfo>()
                .ConvertUsing(typeof(DomainPageInfoToGraphqlPageInfo));

            CreateMap<ServerState, GQL_ServerState>()
                .ConvertUsing(typeof(MqttServerStateToGqlState));
        }
    }
}