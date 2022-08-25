using System.Reflection;
using HotChocolate.Language;
using HotChocolate.Types.Pagination;
using HotChocolate.Types.Descriptors;
using HotChocolate.Types.Descriptors.Definitions;

namespace Aplication.Graphql
{
    public static class ConnectionObjectFieldDescriptorExtensions
    {

        const bool InferConnectionNameFromField = true;

#nullable enable
        public static IObjectFieldDescriptor UseConnection<TNodeType>(
            this IObjectFieldDescriptor descriptor,
            Type? entityType = null,
            string? connectionName = null,
            PagingOptions options = default)
            where TNodeType : class, IOutputType =>
            UseConnection(
                descriptor,
                typeof(TNodeType),
                connectionName,
                options);

        public static IObjectFieldDescriptor UseConnection(
                   this IObjectFieldDescriptor descriptor,
                   Type? nodeType = null,
                   string? connectionName = null,
                   PagingOptions options = default)
        {
            if (descriptor is null)
            {
                throw new ArgumentNullException(nameof(descriptor));
            }

            descriptor.AddPagingArguments(true);

            descriptor
                .Extend()
                .OnBeforeCreate((c, d) =>
                {
                    PagingOptions pagingOptions = c.GetSettings(options);
                    var backward = pagingOptions.AllowBackwardPagination ?? false;

                    ObjectFieldDefinition definition = descriptor.Extend().Definition;

                    if (string.IsNullOrEmpty(connectionName))
                    {
                        var connectionName =
                            pagingOptions.InferConnectionNameFromField ??
                            InferConnectionNameFromField
                                ? EnsureConnectionNameCasing(d.Name)
                                : null;
                    }

                    ITypeReference? typeRef = nodeType is not null
                        ? c.TypeInspector.GetTypeRef(nodeType)
                        : null;

                    if (typeRef is null &&
                        d.Type is SyntaxTypeReference syntaxTypeRef &&
                        syntaxTypeRef.Type.IsListType())
                    {
                        typeRef = syntaxTypeRef.WithType(syntaxTypeRef.Type.ElementType());
                    }

                    MemberInfo? resolverMember = d.ResolverMember ?? d.Member;

                    string methodName = "CreateConnectionTypeRef";

                    Type type = typeof(PagingObjectFieldDescriptorExtensions);

                    MethodInfo info = type.GetMethod(
                        methodName,
                        BindingFlags.NonPublic |
                        BindingFlags.Public |
                        BindingFlags.Static |
                        BindingFlags.FlattenHierarchy
                    );

                    d.Type = (ITypeReference?)info?.Invoke(null, new object[] {
                         c,
                         resolverMember!,
                         connectionName!,
                         typeRef!,
                         options
                    });

                    d.CustomSettings.Add(typeof(Connection));
                });

            return descriptor;
        }

#nullable disable

        private static string EnsureConnectionNameCasing(string connectionName)
        {
            if (char.IsUpper(connectionName[0]))
            {
                return connectionName;
            }

            return string.Concat(char.ToUpper(
                connectionName[0]),
                connectionName.Substring(1)
            );
        }
    }
}