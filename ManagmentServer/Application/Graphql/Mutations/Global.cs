using MediatR;
using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using Aplication.CQRS.Commands;

namespace Aplication.Graphql.Mutations
{

    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class GlobalMutations
    {

        public GlobalMutations()
        {

        }

        /// <summary>
        /// Create WebHook
        /// </summary>
        public async Task<GQL_WebHook> CreateWebHook(
            string url,
            string? secret,
            List<HookEventGroup> groups,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var response = await mediator.Send(
                new CreateWebHook()
                {
                    WebHookUrl = url,
                    Secret = secret,
                    IsActive = true,
                    HookGroups = groups.ToHashSet()
                }
            );

            return mapper.Map<GQL_WebHook>(response);
        }

        /// <summary>
        /// Update webhook Url
        /// </summary>
        public async Task<GQL_WebHook> UpdateWebHookUrl(
            string url,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var response = await mediator.Send(
                new UpdateWebHookUri()
                {
                    WebHookUrl = url,
                }
            );

            return mapper.Map<GQL_WebHook>(response);
        }

        /// <summary>
        /// Update webhook secret
        /// </summary>
        public async Task<GQL_WebHook> UpdateWebHookSecret(
            string secret,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var response = await mediator.Send(
                new UpdateWebHookSecret()
                {
                    Secret = secret,
                }
            );

            return mapper.Map<GQL_WebHook>(response);
        }

        /// <summary>
        /// Update webhook activ/inactive state
        /// </summary>
        public async Task<GQL_WebHook> ActivateWebHook(
            bool activ,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var response = await mediator.Send(
                new UpdateWebHookActivState()
                {
                    IsActive = activ,
                }
            );

            return mapper.Map<GQL_WebHook>(response);
        }

        /// <summary>
        /// Update webhook event Groups
        /// </summary>
        public async Task<GQL_WebHook> UpdateWebHookEventGroups(
            List<HookEventGroup> groups,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var response = await mediator.Send(
                new UpdateWebHookTriggerGroups()
                {
                    HookGroups = groups.ToHashSet(),
                }
            );

            return mapper.Map<GQL_WebHook>(response);
        }
    }
}