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
        : ITypeConverter<MqttState, GQL_MqttState>
    {
        public GQL_MqttState Convert(
            MqttState source,
            GQL_MqttState destination,
            ResolutionContext context)
        {
            switch (source)
            {
                case MqttState.running: return GQL_MqttState.running;
                case MqttState.restarting: return GQL_MqttState.restarting;
                case MqttState.starting: return GQL_MqttState.starting;
                case MqttState.stopping: return GQL_MqttState.stopping;
                case MqttState.stopped: return GQL_MqttState.stopped;

                default: return GQL_MqttState.unknown;
            }
        }
    }


    public class Graphql_Map_Profile : Profile
    {
        public Graphql_Map_Profile()
        {
            CreateMap(typeof(EdgeBase<>), typeof(Edge<>))
                .ConvertUsing(typeof(DomainEdgeToGraphqlEdge<,>));

            CreateMap<PageInfo, ConnectionPageInfo>()
                .ConvertUsing(typeof(DomainPageInfoToGraphqlPageInfo));

            CreateMap<MqttState, GQL_MqttState>()
                .ConvertUsing(typeof(MqttServerStateToGqlState));
        }
    }
}