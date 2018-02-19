using System.Collections.Generic;
using System.IO;
using System.Linq;
using Nancy;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Bbr.Euclid.ClientViewerLibrary.Modules
{
    public class DatabaseLoader : NancyModule
    {
        public DatabaseLoader(IContext context) : base("RetrieveClients")
        {
            Get("Clients", _ => context.ClientDatabase);
        }

    }
}