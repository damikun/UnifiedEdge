using MediatR;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;

namespace API
{
    [ApiController]
    [Route("api/[controller]")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public abstract class PublicBaseController : ControllerBase
    {
        private IMediator? _mediator;
        protected IMediator? Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
    }


    [AttributeUsage(AttributeTargets.Class)]
    public class NestedRouteAttribute : Attribute, IRouteTemplateProvider
    {
        Type _controllerType;
        string _template;

        public NestedRouteAttribute(string template, Type t)
        {
            _controllerType = t;
            _template = template;
        }

        public string? Template
        {
            get
            {
                // Look up the route from the parent type. This only goes up one level, but if the parent class also has a `NestedRouteAttribute`, then it should work recursively.
                Type? bt = _controllerType.BaseType;

                IRouteTemplateProvider? routeAttr = bt?.GetCustomAttributes().Where(a => a is IRouteTemplateProvider).FirstOrDefault() as IRouteTemplateProvider;
                return System.IO.Path.Join(routeAttr?.Template, _template);
            }
        }

        public int? Order => null;

        public string? Name => _template;
    }
}