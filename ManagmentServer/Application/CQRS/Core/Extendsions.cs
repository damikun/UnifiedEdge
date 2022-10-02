
using System.Reflection;
using System.Text.RegularExpressions;

namespace Aplication.Core
{
    public static class HangfireExtensions
    {

        public static string ToGenericTypeString(this Type type)
        {
            if (!type.GetTypeInfo().IsGenericType)
            {
                return type.GetFullNameWithoutNamespace()
                        .ReplacePlusWithDotInNestedTypeName();
            }

            return type.GetGenericTypeDefinition()
                    .GetFullNameWithoutNamespace()
                    .ReplacePlusWithDotInNestedTypeName()
                    .ReplaceGenericParametersInGenericTypeName(type);
        }

        private static string GetFullNameWithoutNamespace(this Type type)
        {
            if (type.IsGenericParameter)
            {
                return type.Name;
            }

            const int dotLength = 1;
            // ReSharper disable once PossibleNullReferenceException
            return !String.IsNullOrEmpty(type.Namespace)
                ? type.FullName.Substring(type.Namespace.Length + dotLength)
                : type.FullName!;
        }

        private static string ReplacePlusWithDotInNestedTypeName(this string typeName)
        {
            return typeName.Replace('+', '.');
        }

        private static string ReplaceGenericParametersInGenericTypeName(this string typeName, Type type)
        {
            var genericArguments = type.GetTypeInfo().GetAllGenericArguments();

            const string regexForGenericArguments = @"`[1-9]\d*";

            var rgx = new Regex(regexForGenericArguments);

            typeName = rgx.Replace(typeName, match =>
            {
                var currentGenericArgumentNumbers = int.Parse(match.Value.Substring(1));
                var currentArguments = string.Join(",", genericArguments.Take(currentGenericArgumentNumbers).Select(ToGenericTypeString));
                genericArguments = genericArguments.Skip(currentGenericArgumentNumbers).ToArray();
                return string.Concat("<", currentArguments, ">");
            });

            return typeName;
        }

        public static Type[] GetAllGenericArguments(this TypeInfo type)
        {
            return type.GenericTypeArguments.Length > 0 ? type.GenericTypeArguments : type.GenericTypeParameters;
        }

        private static readonly Type[] EmptyTypes = new Type[0];

        public static bool IsTaskLike(this Type type, out Func<object, Task> getTaskFunc)
        {
            var typeInfo = type.GetTypeInfo();

            // There are no primitive types that behave as Task
            if (!typeInfo.IsPrimitive)
            {
                if (typeof(Task).GetTypeInfo().IsAssignableFrom(typeInfo))
                {
                    getTaskFunc = obj => (Task)obj;
                    return true;
                }

                if (typeInfo.FullName != null &&
                    typeInfo.FullName.StartsWith("System.Threading.Tasks.ValueTask", StringComparison.Ordinal))
                {
                    var asTask = type.GetRuntimeMethod("AsTask", EmptyTypes);

                    if (asTask != null && asTask.IsPublic && !asTask.IsStatic &&
                        typeof(Task).GetTypeInfo().IsAssignableFrom(asTask.ReturnType.GetTypeInfo()))
                    {
                        getTaskFunc = obj => (Task)asTask.Invoke(obj, null)!;
                        return true;
                    }
                }
            }

            getTaskFunc = null!;
            return false;
        }
    }

}



