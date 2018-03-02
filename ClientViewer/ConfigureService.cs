using Bbr.Euclid.ClientViewerLibrary;
using Topshelf;

namespace Bbr.Euclid.ClientViewer
{
    internal static class ConfigureService
    {
        internal static void Configure(MainConfiguration config)
        {
            HostFactory.Run(configure =>
            {
                configure.Service<MainEntry>(service =>
                {
                    service.ConstructUsing(s => new MainEntry(config));
                    service.WhenStarted(s => s.Start());
                    service.WhenStopped(s => s.Stop());
                });
                //Setup Account that window service use to run.  
                configure.RunAsLocalSystem();
                configure.SetDescription("Client-Viewer-SelfHost Service");
                configure.SetDisplayName("Client-Viewer-SelfHost Service");
                configure.SetServiceName("Client-Viewer Service");
            });
        }
    }
}