import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateAnnouncement } from "@/hooks/useAnnouncements";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Loader2, Megaphone } from "lucide-react";
import { useState } from "react";

const TITLE_MAX = 80;
const BODY_MAX = 500;

export default function AdminPostPage() {
  const createAnnouncement = useCreateAnnouncement();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }
    if (!body.trim()) {
      setError("Please write a message.");
      return;
    }
    try {
      await createAnnouncement.mutateAsync({
        title: title.trim(),
        body: body.trim(),
      });
      setSuccess(true);
      // brief success flash then navigate back
      setTimeout(() => navigate({ to: "/admin/announcements" }), 1200);
    } catch {
      setError("Failed to post. Please try again.");
    }
  }

  const titleRemaining = TITLE_MAX - title.length;
  const bodyRemaining = BODY_MAX - body.length;
  const titleOver = titleRemaining < 0;
  const bodyOver = bodyRemaining < 0;

  return (
    <Layout>
      <div className="px-4 py-5">
        {/* Page header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
            <Megaphone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">
              Post Announcement
            </h2>
            <p className="text-xs text-muted-foreground">
              Share updates with all members
            </p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="post.form"
          >
            {/* Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="post-title" className="text-sm font-medium">
                  Title
                </Label>
                <span
                  className={`text-xs tabular-nums ${
                    titleOver
                      ? "text-destructive font-semibold"
                      : titleRemaining <= 15
                        ? "text-accent-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  {title.length}/{TITLE_MAX}
                </span>
              </div>
              <Input
                id="post-title"
                placeholder="e.g. Sunday Service Update"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={TITLE_MAX + 10}
                className={`h-12 text-base ${
                  titleOver
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }`}
                data-ocid="post.title_input"
              />
            </div>

            {/* Body */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="post-body" className="text-sm font-medium">
                  Message
                </Label>
                <span
                  className={`text-xs tabular-nums ${
                    bodyOver
                      ? "text-destructive font-semibold"
                      : bodyRemaining <= 50
                        ? "text-accent-foreground"
                        : "text-muted-foreground"
                  }`}
                >
                  {body.length}/{BODY_MAX}
                </span>
              </div>
              <Textarea
                id="post-body"
                placeholder="Write your announcement here…"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                maxLength={BODY_MAX + 20}
                rows={6}
                className={`text-base resize-none ${
                  bodyOver
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }`}
                data-ocid="post.textarea"
              />
            </div>

            {/* Error */}
            {error && (
              <p
                className="text-destructive text-sm font-medium bg-destructive/10 rounded-lg px-3 py-2.5"
                data-ocid="post.error_state"
              >
                {error}
              </p>
            )}

            {/* Success */}
            {success && (
              <div
                className="flex items-center gap-2 bg-secondary/15 rounded-lg px-3 py-2.5"
                data-ocid="post.success_state"
              >
                <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                <span className="text-sm font-medium text-secondary-foreground">
                  Posted! Taking you back…
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: "/admin/announcements" })}
                className="flex-1 h-12 text-base"
                data-ocid="post.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  createAnnouncement.isPending ||
                  success ||
                  titleOver ||
                  bodyOver
                }
                className="flex-2 h-12 text-base font-semibold flex-[2]"
                data-ocid="post.submit_button"
              >
                {createAnnouncement.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Posting…
                  </span>
                ) : (
                  "Post Announcement"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
