// using Duende.IdentityServer;
// using Microsoft.AspNetCore.Authorization;

// namespace API
// {
//     public class ApiKeyAuthorizationHandler : IAuthorizationHandler
//     {
//         private readonly ILogger<ApiKeyAuthorizationHandler> _logger;
//         private readonly IConfiguration _configuration;
//         private readonly IHttpContextAccessor _httpContextAccessor;

//         public ApiKeyAuthorizationHandler(
//             ILogger<ApiKeyAuthorizationHandler> logger,
//             IConfiguration configuration,
//             IHttpContextAccessor httpContextAccessor,
//             )
//         {
//             _logger = logger;
//             _configuration = configuration;
//             _httpContextAccessor = httpContextAccessor;
//         }

//         public Task HandleAsync(AuthorizationHandlerContext context)
//         {
//             try
//             {
//                 string? apiKey = _httpContextAccessor?.HttpContext?.Request?.Headers["x-api-key"].FirstOrDefault();
//                 string? apiKeySecret = _httpContextAccessor?.HttpContext?.Request?.Headers["secret-api-key"].FirstOrDefault();

//                 if (apiKey != null && apiKeySecret != null)
//                 {
//                     if (Authorize(apiKey, apiKeySecret))
//                         SetSucceeded(context);
//                 }
//                 return Task.CompletedTask;
//             }
//             catch (Exception ex)
//             {
//                 _logger.LogError(ex, "HandleAsync");
//                 return Task.CompletedTask;
//             }
//         }

//         public class ValidateResponse
//         {
//             public string UserId { get; set; }
//         }
//         private bool Authorize(string apiKey, string apiKeySecret)
//         {
//             try
//             {
//                 using (var client = new HttpClient())
//                 {
//                     var url = _configuration["AuthorizationServerUrl"] + "/api/ApiKey/Validate";
//                     var json = JsonConvert.SerializeObject(new
//                     {
//                         clientId = "serverb-api", // different ApiKeys for different clients
//                         apiKey = apiKey,
//                         apiKeySecret = apiKeySecret
//                     });
//                     var response = client.PostAsync(url, new StringContent(json, Encoding.UTF8, "application/json")).Result;
//                     if (response.IsSuccessStatusCode)
//                     {
//                         var contents = response.Content.ReadAsStringAsync().Result;
//                         var result = JsonConvert.DeserializeObject<ValidateResponse>(contents);
//                         _httpContextAccessor.HttpContext.Items.Add("UserId", result.UserId);
//                     }
//                     return response.IsSuccessStatusCode;
//                 }
//             }
//             catch (Exception ex)
//             {
//                 _logger.LogError(ex, "Authorize");
//                 return false;
//             }
//         }

//         private void SetSucceeded(AuthorizationHandlerContext context)
//         {
//             var pendingRequirements = context.PendingRequirements.ToList();
//             foreach (var requirement in pendingRequirements)
//             {
//                 context.Succeed(requirement);
//             }
//         }
//     }

// }