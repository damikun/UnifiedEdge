
// Copyright (c) Dalibor Kundrat All rights reserved.
// See LICENSE in root.

using Microsoft.AspNetCore.Http;

namespace Aplication.Core
{

    public static class Common
    {

        // Check if object is derived from specific type
        public static bool IsSubclassOfRawGeneric(Type generic, Type toCheck)
        {
            while (toCheck != null && toCheck != typeof(object))
            {
                var cur = toCheck.IsGenericType ? toCheck.GetGenericTypeDefinition() : toCheck;
                if (generic == cur)
                {
                    return true;
                }
                toCheck = toCheck.BaseType;
            }
            return false;
        }

        public async static Task<HttpRequest> HandleTracingActivityRename(HttpRequest req)
        {
            req.EnableBuffering();

            try
            {
               // To be implemented !
            }
            finally
            {

            }

            return req;
        }

    }
}