using Persistence.Portal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Aplication.Core
{
    public class RestApiGate
        : Attribute, IAsyncResourceFilter
    {
        public RestApiGate()
        {

        }

        public void OnResourceExecuted(ResourceExecutedContext context)
        {

        }

        public async Task OnResourceExecutionAsync(
            ResourceExecutingContext context,
            ResourceExecutionDelegate next
        )
        {
            var factory = context.HttpContext.RequestServices
            .GetRequiredService<IDbContextFactory<ManagmentDbCtx>>();

            await using ManagmentDbCtx dbContext =
                factory.CreateDbContext();

            if (await dbContext.Edge.AnyAsync(
                e => e.ApiRest == true,
                context.HttpContext.RequestAborted
            ))
            {
                context.Result = new NotFoundResult();
            };
        }
    }
}