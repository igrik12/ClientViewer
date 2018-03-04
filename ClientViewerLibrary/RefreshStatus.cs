using System;
using System.Collections.Generic;

namespace Bbr.Euclid.ClientViewerLibrary
{
    public class RefreshStatus
    {
        public RefreshStatus(DateTime lastRefresh, DateTime nextRefresh)
        {
            LastRefresh = lastRefresh;
            NextRefresh = nextRefresh;
        }

        public DateTime LastRefresh { get; set; }
        public DateTime NextRefresh { get; set; }
        public TimeSpan TimeTillNextRefresh { get; set; }

        public List<string> RefreshBlob => new List<string>()
        {
            LastRefresh.ToShortTimeString(),
            NextRefresh.ToShortTimeString(),
            TimeTillNextRefresh.ToString("mm\\:ss")
        };
    }
}