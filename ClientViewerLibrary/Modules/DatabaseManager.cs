using Nancy;
using Newtonsoft.Json;

namespace Bbr.Euclid.ClientViewerLibrary.Modules
{
    public class DatabaseManager : NancyModule
    {
        public DatabaseManager(IContext context) : base("Database")
        {
            Get("Update/{interval}", _ => context.SetUpdateInterval(int.Parse(_.interval)));
            Get("Refresh/{name}", _ =>
            {
                var refreshed = context.RefreshClientDatabase((string) _.name);
                return JsonConvert.SerializeObject(refreshed);
            });
        }
    }
}