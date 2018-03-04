namespace Bbr.Euclid.ClientViewerLibrary
{
    public class ClientWrapper
    {
        public ClientWrapper(string name, object fleets, RefreshStatus refreshStatus)
        {
            Name = name;
            Fleets = fleets;
            RefreshStatus = refreshStatus;
        }
        public RefreshStatus RefreshStatus { get; set; }
        public object Fleets { get; set; }
        public string Name { get; set; }
    }
}