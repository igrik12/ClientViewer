using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Nancy;
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
        }

    }

    public class ClientWrapper
    {
        public string Name { get; set; }
        public List<string> Fleets { get; set; }
    }
}