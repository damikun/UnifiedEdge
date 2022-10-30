using System.Text;
using Domain.Server;
using System.Linq.Expressions;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;


namespace Persistence.Configuration
{

    public class EnumArrToString_StringToEnumArr_Converter : ValueConverter<HashSet<HookEventGroup>, string>
    {

        public EnumArrToString_StringToEnumArr_Converter(
            [NotNullAttribute] Expression<Func<HashSet<HookEventGroup>, string>> convertToProviderExpression,
            [NotNullAttribute] Expression<Func<string, HashSet<HookEventGroup>>> convertFromProviderExpression)
                : base(convertToProviderExpression, convertFromProviderExpression)
        {
        }

        public override Expression<Func<HashSet<HookEventGroup>, string>> ConvertToProviderExpression
        {
            get
            {

                Expression<Func<HashSet<HookEventGroup>, string>> converterExpression = x => Convert(x);

                return converterExpression;
            }
        }

        public override Expression<Func<string, HashSet<HookEventGroup>>> ConvertFromProviderExpression
        {
            get
            {

                Expression<Func<string, HashSet<HookEventGroup>>> converterExpression = x => Convert(x);

                return converterExpression;
            }
        }

        public static string Convert(HashSet<HookEventGroup> sourceMember)
        {
            if (sourceMember == null || !sourceMember.Any())
            {
                return "";
            }
            else
            {
                var src_arr = sourceMember.ToArray();

                StringBuilder sb = new StringBuilder();

                for (int i = 0; i < src_arr.Length; i++)
                {
                    if (i == 0)
                    {
                        sb.Append(src_arr[i].ToString());
                    }
                    else
                    {
                        sb.Append(string.Format(",{0}", src_arr[i].ToString()));
                    }
                }

                return sb.ToString();
            }
        }

        public static HashSet<HookEventGroup> Convert(string sourceMember)
        {
            var list = new List<HookEventGroup>();

            if (!String.IsNullOrWhiteSpace(sourceMember))
            {
                sourceMember = sourceMember.Trim();
                foreach (var item in sourceMember.Split(
                    new[] { ',' }, StringSplitOptions.RemoveEmptyEntries).Distinct()
                )
                {
                    if (item != null)
                    {
                        try
                        {
                            list.Add(Enum.Parse<HookEventGroup>(item));
                        }
                        catch { }
                    }
                }
            }

            return list.ToHashSet();
        }

    }
}
