using Persistence.Portal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Aplication.Core
{
    public class GraphqlGate : IEndpointFilter
    {
        public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext efiContext,
            EndpointFilterDelegate next)
        {
            {
                var _factory = efiContext.HttpContext.RequestServices
                    .GetRequiredService<IDbContextFactory<ManagmentDbCtx>>();

                await using ManagmentDbCtx dbContext =
                    _factory.CreateDbContext();

                if (!await dbContext.Edge.AnyAsync(
                    e => e.ApiGraphql == true,
                    efiContext.HttpContext.RequestAborted
                ))
                {
                    var result = new ObjectResult("API is disabled");

                    result.StatusCode = 401;

                    return result;
                }
                else
                {
                    return await next(efiContext);
                }
            }
        }
    }
}