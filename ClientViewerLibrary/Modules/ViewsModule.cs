using Nancy;

namespace Bbr.Euclid.ClientViewerLibrary.Modules
{
    public class ViewsModule : NancyModule
    {
        public ViewsModule()
        {
            Get("/", parameters => View["index"]);
        }
    }
}