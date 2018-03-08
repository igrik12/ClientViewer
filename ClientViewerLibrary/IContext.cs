using System.Collections.Generic;

namespace Bbr.Euclid.ClientViewerLibrary
{
    /// <summary>
    /// Context interface to be implemented by anything that needs to be accessed in Nancy modules.
    /// </summary>
    public interface IContext
    {
        List<ClientWrapper> ClientWrappers { get; set; }
        string AddClientByName(string name);
        void SetUpdateInterval(int intervalInSeconds);
        List<ClientWrapper> RefreshClientDatabase(string clientName);
        int RefreshInterval { get; set; }
        RefreshStatus RefreshStatus { get; set; }
        List<string> ClientNames { get; set; }
        List<ClientWrapper> RefreshDatabase();
    }
}