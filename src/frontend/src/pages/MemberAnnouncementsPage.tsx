import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { Bell, Clock } from "lucide-react";

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MemberAnnouncementsPage() {
  const { data: announcements, isLoading } = useAnnouncements();

  return (
    <Layout>
      <div className="px-4 py-5">
        <h2 className="font-display font-bold text-xl text-foreground mb-5">
          Church Updates
        </h2>

        {isLoading && (
          <div className="space-y-3" data-ocid="announcements.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
        )}

        {!isLoading && (!announcements || announcements.length === 0) && (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="announcements.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-primary/60" />
            </div>
            <p className="font-display font-semibold text-foreground text-lg">
              No updates yet
            </p>
            <p className="text-muted-foreground text-sm mt-1 max-w-xs">
              Check back soon for announcements from your leaders.
            </p>
          </div>
        )}

        <div className="space-y-3" data-ocid="announcements.list">
          {[...(announcements ?? [])]
            .sort((a, b) => Number(b.createdAt - a.createdAt))
            .map((a, i) => (
              <div
                key={a.id.toString()}
                className="bg-card rounded-xl border-l-4 border-l-primary border border-border p-4 shadow-sm"
                data-ocid={`announcements.item.${i + 1}`}
              >
                <p className="text-xs font-bold tracking-widest text-primary uppercase mb-2">
                  Announcement
                </p>
                <h3 className="font-display font-bold text-base text-foreground leading-snug mb-2">
                  {a.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {a.body}
                </p>
                <div className="flex items-center gap-1.5 mt-3 text-muted-foreground text-xs">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>
                    {formatDate(a.createdAt)} ·{" "}
                    <span className="font-medium text-foreground/70">
                      {a.authorId}
                    </span>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}
