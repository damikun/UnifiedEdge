using MediatR;
using AutoMapper;
using Server.Manager;
using Aplication.DTO;
using Aplication.Core;
using HotChocolate.Resolvers;
using Aplication.CQRS.Queries;
using Aplication.CQRS.Commands;
using Aplication.Graphql.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Server.Manager.Mqtt;
using Server.Mqtt;
using Domain.Server;

namespace Aplication.Graphql.Mutations
{
    /// <summary>
    /// Mutation
    /// </summary>
    public class Mutation
    {

        private readonly IMapper _mapper;

        public Mutation(
            IMapper mapper)
        {
            _mapper = mapper;
        }

        public class CreateServerInput
        {

#nullable disable
            /// <summary> Name </summary>
            public string Name { get; set; }
#nullable enable

            /// <summary> Description </summary>
            public string? Description { get; set; }

            /// <summary> Server Type </summary>
            public GQL_ServerVariant Type { get; set; }

        }

        /// <summary>
        /// Creates new server
        /// </summary>
        /// <returns>GQL_IServer</returns>
        public async Task<GQL_IServer> CreateServer(
            CreateServerInput request,
            [Service] IMediator mediator)
        {
            ICommandCore? cmd = GetServerCreateCmd(request);

            var dto = await mediator.Send(cmd!);

            return _mapper.Map<GQL_MqttServer>(dto);
        }

        public async Task<bool> ServerCmd(
            [ID] string uid,
            GQL_ServerCmd cmd,
            [Service] IMediator mediator,
            IResolverContext context)
        {
            var server_db = await mediator.Send(
                new GetServer()
                {
                    Guid = uid!
                }
            );

            return true;
        }
        //
        public Task<bool> Testik(
            [Service] IServiceProvider provider,
            [Service] IServiceCollection services
            )
        {
            var ssss = provider.GetServices(typeof(IServerManager));

            System.Console.WriteLine("--------------");
            foreach (var item in ssss)
            {
                System.Console.WriteLine(item?.GetType().Name);
            }

            // services.Any

            // var managers = services.Where(
            //     e => e.ImplementationType?
            //     .GetInterfaces()
            //     .Any(e => e.Name == nameof(IServerManager)) == true
            // ).ToList();

            // managers.S

            System.Console.WriteLine("*******************");
            // foreach (var item in sss)
            // {
            //     System.Console.WriteLine(item.GetType().ToString());
            //     System.Console.WriteLine(item.ImplementationType?.ToString());
            //     System.Console.WriteLine(item.ImplementationInstance?.ToString());
            //     System.Console.WriteLine(item.ServiceType);
            //     System.Console.WriteLine();
            // }

            return Task.FromResult(false);

            // return Task.CompletedTask;

        }

        [GraphQLIgnore]
        private CommandCore? GetServerCreateCmd(CreateServerInput request)
        {
            switch (request.Type)
            {
                case GQL_ServerVariant.mqtt:
                    return new CreateMqttServer()
                    {
                        Name = request.Name,
                        Description = request.Description,
                    };

                case GQL_ServerVariant.opc:
                    return new CreateOpcServer()
                    {
                        Name = request.Name,
                        Description = request.Description,
                    };

                default: return null;
            }
        }
    }
}
