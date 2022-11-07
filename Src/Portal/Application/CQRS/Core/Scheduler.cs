using Hangfire;
using Hangfire.Common;
using System.Reflection;
using System.ComponentModel;
using System.Linq.Expressions;

namespace Aplication.Core
{
    public static class SchedulerHelpers
    {
        public static string? JobName(Job job)
        {

            var p = Expression.Parameter(typeof(object));
            var converted = Expression.Convert(p, typeof(DisplayNameAttribute));

            Func<object, string> GetDisplayName = Expression.Lambda<Func<object, string>>(
                Expression.Call(converted, "get_DisplayName", null),
                p
            ).Compile();

            if (job == null)
            {
                return null;
            }

            var jobDisplayNameAttribute = job.Method.GetCustomAttribute<JobDisplayNameAttribute>();

            if (jobDisplayNameAttribute != null)
            {
                return jobDisplayNameAttribute.DisplayName;
            }

            var attribute = job.Method.GetCustomAttribute(typeof(DisplayNameAttribute));

            if (attribute != null)
            {
                try
                {
                    return String.Format(GetDisplayName(attribute), job.Args.ToArray());
                }
                catch (FormatException)
                {

                }
            }

            return job.ToString();
        }
    }
}