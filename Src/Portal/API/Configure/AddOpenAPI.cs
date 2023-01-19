
using System.Reflection;
using Microsoft.OpenApi.Models;
using Swashbuckle.Swagger;

namespace API
{
    public static partial class ServiceExtension
    {

        public static IServiceCollection AddOpenAPI(
            this IServiceCollection serviceCollection
        )
        {

            serviceCollection.AddSwaggerGen(e =>
            {
                e.AddSecurityDefinition(name: "Bearer", securityScheme: new OpenApiSecurityScheme
                {
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Scheme = "bearer",
                });
                e.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        }, new List<string>()
                    }
                });

                e.CustomSchemaIds(
                      type => type.FriendlyId()
                      .Replace("[", "< ")
                      .Replace("]", ">")
                );

                var xmlFile = $"{Assembly.GetEntryAssembly()?.GetName().Name}.xml" ?? "ApiGen.xml";
                var xmlPath = System.IO.Path.Combine(AppContext.BaseDirectory, xmlFile);

                e.IncludeXmlComments(xmlPath, true);

                e.UseInlineDefinitionsForEnums();
            }

            );

            return serviceCollection;

        }
    }
}