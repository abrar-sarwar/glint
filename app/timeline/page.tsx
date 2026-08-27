import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/Page";
import { TimelineList } from "@/components/timeline/TimelineList";
import { eventsChronological, stats } from "@/lib/intel";

export const metadata: Metadata = { title: "Timeline" };

export default function TimelinePage() {
  return (
    <div className="px-8 py-8">
      <PageHeader
        kicker={`Timeline · ${stats.events} events · ${stats.verifiedEvents} verified`}
        title="What happened, in order"
        lede="Every entry records the date the thing happened, not the date an article was published. Where those differ, both are shown. Confidence and status are assigned per event, and each one cites the sources it rests on."
      />
      <div className="mt-2">
        <Suspense fallback={<p className="py-10 text-[15px] text-ink-muted">Loading the timeline.</p>}>
          <TimelineList events={eventsChronological} />
        </Suspense>
      </div>
    </div>
  );
}
