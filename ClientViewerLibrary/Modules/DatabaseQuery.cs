using System;
using System.Collections.Generic;
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
            Get("Get", _ => context.ClientDatabase);
            Get("Contains/{name}", _ => context.ClientDatabase.ContainsKey((string)_.name));
            Get("Remove/{name}", _ =>
            {
                context.ClientDatabase.Remove((string) _.name);
                return context.ClientDatabase;
            });
            Get("AddClientByName/{name}", _ =>
            {
                var clientName = (string)_.name;
                if (!context.ClientDatabase.ContainsKey(clientName))
                {
                    return true;
                }

                return false;
            });

            Post("AddClient", _ =>
            {
                var jsonString = RequestStream.FromStream(Request.Body).AsString();
                var obj = JsonConvert.DeserializeObject(jsonString);
                var parsed = JsonConvert.DeserializeObject<ClientBlob>((string)obj);
                if(!context.ClientDatabase.ContainsKey(parsed.Name))
                {
                    context.ClientDatabase.Add(parsed.Name, new List<string>(){});
                }         
                return true;
            });
        }

    }
}