using MediatR;
using System.Text;
using Domain.Server;
using Aplication.Core;
using System.Text.Json;
using Persistence.Portal;
using Microsoft.EntityFrameworkCore;

namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// Command for processing WebHook event
    /// </summary>
    public class ProcessWebHook : CommandBase
    {
        public ProcessWebHook()
        {
            // this.Flags.scheduled = true;
        }

        public long HookId { get; set; }
        public dynamic Event { get; set; }
        public HookEventGroup EventGroup { get; set; }
    }

    /// <summary>
    /// Command handler for <c>ProcessWebHook</c>
    /// </summary>
    public class ProcessWebHookHandler : IRequestHandler<ProcessWebHook, Unit>
    {

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IMediator</c>
        /// </summary>
        private readonly IMediator _mediator;

        /// <summary>
        /// Injected <c>IHttpClientFactory</c>
        /// </summary>
        private readonly IHttpClientFactory _clientFactory;

        /// <summary>
        /// Main Constructor
        /// </summary>
        public ProcessWebHookHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMediator mediator,
            IHttpClientFactory httpClient)
        {
            _factory = factory;
            _mediator = mediator;
            _clientFactory = httpClient;
        }

        /// <summary>
        /// Command handler for  <c>ProcessWebHook</c>
        /// </summary>
        public async Task<Unit> Handle(ProcessWebHook request, CancellationToken cancellationToken)
        {

            WebHookRecord record = new WebHookRecord()
            {
                WebHookID = request.HookId,
                Guid = Guid.NewGuid().ToString(),
                HookEventGroup = request.EventGroup,
                Timestamp = DateTime.Now
            };

            if (request == null || request.HookId <= 0)
            {
                record.Result = RecordResult.param;
            }

            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            try
            {

                WebHook? hook = null;

                try
                {
                    hook = await dbContext.WebHooks
                    .Where(e => e.Id == request.HookId)
                    .FirstOrDefaultAsync(cancellationToken);

                    if (hook != null)
                    {
                        hook.LastTrigger = DateTime.Now;

                        await dbContext.SaveChangesAsync(cancellationToken);
                    }

                }
                catch (Exception ex)
                {
                    record.Result = RecordResult.query;
                    record.Exception = ex.ToString();

                    return Unit.Value;
                }

                if (hook != null)
                {
                    var options = new JsonSerializerOptions
                    {
                        WriteIndented = true,
                        IncludeFields = true,
                    };

                    var serialised_request_body = new StringContent(
                        JsonSerializer.Serialize<dynamic>(request.Event, options),
                        Encoding.UTF8,
                        "application/json"
                    );


                    var httpClient = _clientFactory.CreateClient();

                    /* Set Headers */
                    httpClient.DefaultRequestHeaders.Add("X-Edge-Delivery", record.Guid);

                    if (!string.IsNullOrWhiteSpace(hook.Secret))
                    {
                        httpClient.DefaultRequestHeaders.Add("X-Edge-Secret", hook.Secret);
                    }

                    httpClient.DefaultRequestHeaders.Add(
                        "X-Edge-Event",
                        request.EventGroup.ToString().ToLowerInvariant()
                    );

                    record.RequestBody = await serialised_request_body.ReadAsStringAsync(cancellationToken);

                    var serialized_headers = new StringContent(
                        JsonSerializer.Serialize(
                            httpClient.DefaultRequestHeaders.ToList(),
                            options
                        ),
                        Encoding.UTF8,
                        "application/json"
                    );

                    record.RequestHeaders = await serialized_headers.ReadAsStringAsync(cancellationToken);

                    if (!string.IsNullOrWhiteSpace(hook.WebHookUrl))
                    {
                        try
                        {
                            using var httpResponse = await httpClient.PostAsync(hook.WebHookUrl, serialised_request_body);

                            if (httpResponse != null)
                            {
                                record.StatusCode = (int)httpResponse.StatusCode;

                                if (httpResponse.Content.Headers != null && httpResponse.Content.Headers.Any())
                                {
                                    if (httpResponse.Content.Headers.ContentType != null)
                                    {
                                        record.ResponseContentType = httpResponse.Content.Headers.ContentType.MediaType;

                                        if (httpResponse.Content.Headers.ContentType.MediaType != null)
                                            record.isJsonResponse = httpResponse.Content.Headers.ContentType.MediaType
                                                .Equals("application/json", StringComparison.OrdinalIgnoreCase);

                                        if (httpResponse.Content.Headers.ContentType.MediaType != null)
                                            record.isTextHtmlResponse = httpResponse.Content.Headers.ContentType.MediaType
                                                .Equals("text/html", StringComparison.OrdinalIgnoreCase);
                                    }
                                }

                                if (httpResponse.Content != null)
                                {
                                    try
                                    {
                                        record.ResponseBody = await httpResponse.Content.ReadAsStringAsync(cancellationToken);
                                    }
                                    catch { }
                                }
                            }

                            record.Result = RecordResult.ok;
                        }
                        catch (Exception ex)
                        {
                            record.Result = RecordResult.http;
                            record.Exception = ex.ToString();
                        }
                    }
                    else
                    {
                        record.Result = RecordResult.param;
                    }
                }
                else
                {
                    record.Result = RecordResult.param;
                }

            }
            finally
            {

                try
                {
                    dbContext.WebHooksHistory.Add(record);
                    await dbContext.SaveChangesAsync(cancellationToken);
                }
                catch { }

            }

            return Unit.Value;
        }
    }
}