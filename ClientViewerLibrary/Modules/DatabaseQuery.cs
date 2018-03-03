using System.Dynamic;
using Nancy;
using Nancy.Extensions;
using Nancy.IO;
using Newtonsoft.Json;

namespace Bbr.Euclid.ClientViewerLibrary.Modules
{
    public class DatabaseQuery : NancyModule
    {
        public DatabaseQuery(IContext context) : base("Clients")
        {
            Get("Get", _ => JsonConvert.SerializeObject(context.ClientDatabase));
            Get("Contains/{name}", _ => context.ClientDatabase.ContainsKey((string) _.name));
            Get("Remove/{name}", _ =>
            {
                context.ClientDatabase.Remove((string) _.name);
                return JsonConvert.SerializeObject(context.ClientDatabase);
            });

            Get("AddClientByName/{clientName}", _ =>
            {
                var updated = context.AddClientByName((string) _.clientName);
                return !updated.ToLower().Contains("error")
                    ? JsonConvert.SerializeObject(context.ClientDatabase)
                    : JsonConvert.SerializeObject(updated);
            });

            Post("AddClient/{clientName}", _ =>
            {
                var jsonString = RequestStream.FromStream(Request.Body).AsString();
                var fleet = JsonConvert.DeserializeObject(jsonString);
                var onceMore = JsonConvert.DeserializeObject((string) fleet);
                var name = (string) _.clientName;
                if (!context.ClientDatabase.ContainsKey(name))
                {
                    context.ClientDatabase.Add(name, onceMore);
                    return JsonConvert.SerializeObject(context.ClientDatabase);
                }
                return JsonConvert.SerializeObject(context.ClientDatabase);
            });
        }
    }
}