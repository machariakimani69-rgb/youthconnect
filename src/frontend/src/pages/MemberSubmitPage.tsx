import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useSubmitClaim } from "@/hooks/useClaims";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Heart, Loader2 } from "lucide-react";
import { useState } from "react";

export default function MemberSubmitPage() {
  const submitClaim = useSubmitClaim();
  const { user } = useAuth();
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    const parsed = Number.parseInt(amount.trim(), 10);
    if (!amount.trim() || Number.isNaN(parsed) || parsed <= 0) {
      setError("Please enter a valid contribution amount.");
      return;
    }
    try {
      await submitClaim.mutateAsync({
        amount: parsed,
        notes: notes.trim() || undefined,
      });
      setAmount("");
      setNotes("");
      setSuccess(true);
    } catch {
      setError("Failed to submit claim. Please try again.");
    }
  }

  function handleSubmitAnother() {
    setSuccess(false);
    setAmount("");
    setNotes("");
  }

  return (
    <Layout>
      <div className="px-4 py-5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <Heart className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">
              Submit Contribution
            </h2>
            <p className="text-xs text-muted-foreground">
              Your leader will review and approve it
            </p>
          </div>
        </div>

        {/* Member name display */}
        {user && (
          <div
            className="bg-primary/8 rounded-xl px-4 py-3 mb-5 flex items-center gap-3 border border-primary/15"
            data-ocid="submit.member_badge"
          >
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary">
                {user.displayName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Submitting as</p>
              <p className="font-semibold text-foreground text-sm">
                {user.displayName}
              </p>
            </div>
          </div>
        )}

        {success ? (
          <div
            className="bg-card rounded-2xl border border-secondary/30 shadow-sm p-6 text-center"
            data-ocid="submit.success_state"
          >
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-display font-bold text-xl text-foreground mb-2">
              Claim Submitted!
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Your contribution has been logged. Your leader will review and
              approve it shortly.
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleSubmitAnother}
                className="w-full h-12 text-base font-semibold rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                data-ocid="submit.submit_another_button"
              >
                Submit Another
              </button>
              <Link
                to="/member/contributions"
                className="w-full h-12 text-base font-semibold rounded-xl border border-border bg-card text-foreground flex items-center justify-center transition-colors hover:bg-muted/50"
                data-ocid="submit.view_history_link"
              >
                View My Contributions
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              data-ocid="submit.form"
            >
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium">
                  Amount (GHS)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm">
                    GHS
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    inputMode="numeric"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-12 text-base pl-12"
                    min="1"
                    data-ocid="submit.amount_input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">
                  Notes{" "}
                  <span className="text-muted-foreground font-normal">
                    (optional)
                  </span>
                </Label>
                <Textarea
                  id="notes"
                  placeholder="e.g. Sunday offering, volunteer service hours…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="text-base resize-none"
                  data-ocid="submit.notes_textarea"
                />
              </div>

              {error && (
                <p
                  className="text-destructive text-sm font-medium bg-destructive/10 rounded-lg px-3 py-2"
                  data-ocid="submit.error_state"
                >
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={submitClaim.isPending}
                className="w-full h-12 text-base font-semibold"
                data-ocid="submit.submit_button"
              >
                {submitClaim.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting…
                  </span>
                ) : (
                  "Submit Claim"
                )}
              </Button>
            </form>
          </div>
        )}

        {!success && (
          <div className="bg-muted/30 rounded-xl p-4 mt-4 border border-border">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">How it works:</strong> Submit
              your contribution amount and any notes. Your church leader will
              review and approve or reject your claim. Approved contributions
              will appear in your contributions history.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
