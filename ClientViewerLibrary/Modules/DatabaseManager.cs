using System;
using System.Linq;
using Nancy;
using Nancy.Extensions;
using Nancy.IO;
using Newtonsoft.Json;

namespace Bbr.Euclid.ClientViewerLibrary.Modules
{
    /// <summary>
    /// Database Nancy query module. Provides all the required queries for CRUD operations.
    /// </summary>
    /// <seealso>
    ///     <cref>Nancy.NancyModule</cref>
    /// </seealso>
    public class DatabaseManager : NancyModule
    {
        public DatabaseManager(IContext context) : base("Database")
        {
            Get("Get", _ => JsonConvert.SerializeObject(context.ClientWrappers));
            Get("Remove/{name}", _ =>
            {
                context.ClientWrappers.RemoveAll(x => x.Name.ToLower().Equals(((string) _.name).ToLower()));
                return JsonConvert.SerializeObject(context.ClientWrappers);
            });

            Get("AddClientByName/{clientName}", _ =>
            {
                var updated = context.AddClientByName((string) _.clientName);
                return !updated.ToLower().Contains("error")
                    ? JsonConvert.SerializeObject(context.ClientWrappers)
                    : JsonConvert.SerializeObject(updated);
            });

            Get("Update/{interval}", _ => context.SetUpdateInterval(int.Parse(_.interval)));
            Get("Refresh/{name}", _ =>
            {
                var refreshed = context.RefreshClientDatabase((string)_.name);
                return JsonConvert.SerializeObject(refreshed);
            });

            Post("AddClient/{clientName}", _ =>
            {
                var jsonString = RequestStream.FromStream(Request.Body).AsString();
                var fleet = JsonConvert.DeserializeObject(jsonString);
                var onceMore = JsonConvert.DeserializeObject((string) fleet);
                var name = (string) _.clientName;

                if (!context.ClientWrappers.Any(x => x.Name.ToLower().Equals(name.ToLower())))
                {
                    context.ClientWrappers.Add(new ClientWrapper(name, onceMore,
                        new RefreshStatus(DateTime.Now, DateTime.Now + TimeSpan.FromSeconds(context.RefreshInterval))));
                    return JsonConvert.SerializeObject(context.ClientWrappers);
                }

                return JsonConvert.SerializeObject(context.ClientWrappers);
            });
        }
    }
}