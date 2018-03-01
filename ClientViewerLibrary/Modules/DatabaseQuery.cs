using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using Nancy;
using Nancy.Extensions;
using Nancy.IO;
using Nancy.Json;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Bbr.Euclid.ClientViewerLibrary.Modules
{
    public class DatabaseQuery : NancyModule
    {
        public DatabaseQuery(IContext context) : base("Clients")
        {
            Get("Get", _ => ConvertToArrayJson(context));
            Get("Contains/{name}", _ => context.ClientDatabase.ContainsKey((string) _.name));
            Get("Remove/{name}", _ =>
            {
                context.ClientDatabase.Remove((string) _.name);
                return ConvertToArrayJson(context);
            });

            Post("AddClient/{clientName}", _ =>
            {
                var jsonString = RequestStream.FromStream(Request.Body).AsString();
                var fleet = JsonConvert.DeserializeObject(jsonString);
                var onceMore = JsonConvert.DeserializeObject((string)fleet);
                var name = (string) _.clientName;
                if (!context.ClientDatabase.ContainsKey(name))
                {
                    context.ClientDatabase.Add(name, onceMore);
                    return ConvertToArrayJson(context);
                }
                return JsonConvert.SerializeObject(context.ClientDatabase);
            });
        }

        private static string ConvertToArrayJson(IContext context)
        {
            var listOfNew = new object[context.ClientDatabase.Count];
            var count = 0;
            foreach (var kvp in context.ClientDatabase)
            {
                dynamic expand = new ExpandoObject();
                expand.Name = kvp.Key;
                expand.Fleets = kvp.Value;
                listOfNew[count] = expand;
                count++;
            }
            return JsonConvert.SerializeObject(listOfNew);
        }
    }
}