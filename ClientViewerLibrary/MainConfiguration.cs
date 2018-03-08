using System.Collections.Generic;

namespace Bbr.Euclid.ClientViewerLibrary
{
    public class MainConfiguration 
    {
        public string Host { get; set; } = "gbrtebldpw001";
        public string UserName { get; set; } = "igor.lavrentjev";
        public string Password { get; set; } = "Smint2013";
        public string MainClientProjectName { get; set; } = "Clients";
        public Dictionary<string,string> LocalDatabases { get; set; }
    }

}