using MediatR;
using AutoMapper;
using Domain.Server;
using Aplication.DTO;
using Aplication.CQRS.Commands;
using Aplication.Graphql.Errors;

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
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_WebHook> CreateWebHook(
            string name,
            string url,
            string? secret,
            [ID] string? server_id,
            List<HookEventGroup> groups,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var response = await mediator.Send(
                new CreateWebHook()
                {
                    Name = name,
                    WebHookUrl = url,
                    Secret = secret,
                    IsActive = true,
                    HookGroups = groups.ToHashSet(),
                    ServerUid = server_id
                }
            );

            return mapper.Map<GQL_WebHook>(response);
        }

        /// <summary>
        /// Remove WebHook
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_WebHook> RemoveWebHook(
            [ID] long hook_id,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var response = await mediator.Send(
                new RemoveWebHook()
                {
                    WebHookId = hook_id,
                }
            );

            return mapper.Map<GQL_WebHook>(response);
        }

        /// <summary>
        /// Update webhook Url
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_WebHook> UpdateWebHookUrl(
            string url,
            [ID] long hook_id,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var response = await mediator.Send(
                new UpdateWebHookUri()
                {
                    WebHookId = hook_id,
                    WebHookUrl = url,
                }
            );

            return mapper.Map<GQL_WebHook>(response);
        }

        /// <summary>
        /// Update webhook secret
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_WebHook> UpdateWebHookSecret(
            string secret,
            [ID] long hook_id,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var response = await mediator.Send(
                new UpdateWebHookSecret()
                {
                    WebHookId = hook_id,
                    Secret = secret,
                }
            );

            return mapper.Map<GQL_WebHook>(response);
        }

        /// <summary>
        /// Update webhook name
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_WebHook> UpdateWebHookName(
            string name,
            [ID] long hook_id,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var response = await mediator.Send(
                new UpdateWebHookName()
                {
                    WebHookId = hook_id,
                    Name = name,
                }
            );

            return mapper.Map<GQL_WebHook>(response);
        }

        /// <summary>
        /// Update webhook activ/inactive state
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_WebHook> UpdateWebHookActiveState(
            bool activ,
            [ID] long hook_id,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var response = await mediator.Send(
                new UpdateWebHookActivState()
                {
                    WebHookId = hook_id,
                    IsActive = activ,
                }
            );

            return mapper.Map<GQL_WebHook>(response);
        }

        /// <summary>
        /// Update webhook event Groups
        /// </summary>
        [Error(typeof(ValidationError))]
        [Error(typeof(AuthorizationError))]
        [Error(typeof(InternalError))]
        public async Task<GQL_WebHook> UpdateWebHookEventGroups(
            List<HookEventGroup> groups,
            [ID] long hook_id,
            [Service] IMediator mediator,
            [Service] IMapper mapper
        )
        {
            var response = await mediator.Send(
                new UpdateWebHookTriggerGroups()
                {
                    WebHookId = hook_id,
                    HookGroups = groups.ToHashSet(),
                }
            );

            return mapper.Map<GQL_WebHook>(response);
        }
    }
}