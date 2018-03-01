using System.Collections.Generic;
using System.IO;

namespace Bbr.Euclid.ClientViewerLibrary
{
    public class MainConfiguration 
    {
        public string Host { get; set; } = "gbqmhbldpw004:8001";
        public string UserName { get; set; } = "igor.lavrentjev";
        public string Password { get; set; } = "Smint1985";
        public Dictionary<string, string> Clients { get; set; }
        public Dictionary<string,string> LocalDatabases { get; set; }
    }

}