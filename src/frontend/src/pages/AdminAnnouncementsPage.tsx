import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAnnouncements,
  useDeleteAnnouncement,
} from "@/hooks/useAnnouncements";
import { useNavigate } from "@tanstack/react-router";
import { Bell, Clock, PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminAnnouncementsPage() {
  const { data: announcements, isLoading } = useAnnouncements();
  const deleteAnnouncement = useDeleteAnnouncement();
  const navigate = useNavigate();
  const [pendingDeleteId, setPendingDeleteId] = useState<bigint | null>(null);

  function confirmDelete() {
    if (pendingDeleteId == null) return;
    deleteAnnouncement.mutate(pendingDeleteId, {
      onSettled: () => setPendingDeleteId(null),
    });
  }

  return (
    <Layout>
      <div className="px-4 py-5">
        {/* Page header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">
              Announcements
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {announcements?.length ?? 0} posted
            </p>
          </div>
          <Button
            size="sm"
            onClick={() => navigate({ to: "/admin/post" })}
            className="h-10 gap-1.5 font-semibold"
            data-ocid="announcements.new_button"
          >
            <PlusCircle className="w-4 h-4" />
            Post New
          </Button>
        </div>

        {/* Loading skeletons */}
        {isLoading && (
          <div className="space-y-3" data-ocid="announcements.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && (!announcements || announcements.length === 0) && (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="announcements.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Bell className="w-8 h-8 text-primary/60" />
            </div>
            <p className="font-display font-semibold text-foreground text-lg">
              No announcements yet
            </p>
            <p className="text-muted-foreground text-sm mt-1 mb-5">
              Share updates with your members.
            </p>
            <Button
              onClick={() => navigate({ to: "/admin/post" })}
              data-ocid="announcements.empty_post_button"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Post First Announcement
            </Button>
          </div>
        )}

        {/* List */}
        <div className="space-y-3" data-ocid="announcements.list">
          {announcements?.map((a, i) => (
            <div
              key={a.id.toString()}
              className="bg-card rounded-2xl border border-border p-4 shadow-sm"
              data-ocid={`announcements.item.${i + 1}`}
            >
              {/* Teal accent bar */}
              <div className="w-12 h-1 rounded-full bg-primary mb-3" />

              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  <Badge
                    variant="outline"
                    className="text-xs font-bold tracking-widest text-primary border-primary/30 uppercase mb-2 px-2 py-0.5"
                  >
                    Announcement
                  </Badge>
                  <h3 className="font-display font-bold text-base text-foreground leading-snug mb-1.5">
                    {a.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {a.body}
                  </p>
                  <div className="flex items-center gap-1 mt-2.5 text-muted-foreground text-xs">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">
                      {formatDate(a.createdAt)} · {a.authorId}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => setPendingDeleteId(a.id)}
                  className="flex-shrink-0 text-destructive hover:bg-destructive/10 min-h-11 min-w-11 rounded-xl"
                  aria-label="Delete announcement"
                  data-ocid={`announcements.delete_button.${i + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confirm delete dialog */}
      <Dialog
        open={pendingDeleteId != null}
        onOpenChange={(open) => !open && setPendingDeleteId(null)}
      >
        <DialogContent data-ocid="announcements.dialog">
          <DialogHeader>
            <DialogTitle>Delete Announcement?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The announcement will be permanently
              removed for all members.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setPendingDeleteId(null)}
              data-ocid="announcements.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteAnnouncement.isPending}
              data-ocid="announcements.confirm_button"
            >
              {deleteAnnouncement.isPending ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
