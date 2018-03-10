using Nancy;

namespace Bbr.Euclid.ClientViewerLibrary.Modules
{
    public class UtilityModule : NancyModule
    {
        public UtilityModule(IContext context) : base("Utility`")
        {
            Get("CopyToClipboard/{text}", _=>
            {
                context.CopyToClipboard((string)_.text);
                return "copied";
            });
        }
    }
}