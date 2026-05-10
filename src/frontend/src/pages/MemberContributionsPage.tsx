import { ClaimStatus } from "@/backend";
import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyClaims } from "@/hooks/useClaims";
import { useStats } from "@/hooks/useStats";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, Heart, PlusCircle, XCircle } from "lucide-react";

function statusBadge(status: ClaimStatus) {
  if (status === ClaimStatus.Approved)
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-secondary/20 text-secondary-foreground border border-secondary/30">
        <CheckCircle2 className="w-3 h-3" />
        Approved
      </span>
    );
  if (status === ClaimStatus.Rejected)
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-destructive/10 text-destructive border border-destructive/20">
        <XCircle className="w-3 h-3" />
        Rejected
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-accent/20 text-accent-foreground border border-accent/30">
      <Clock className="w-3 h-3" />
      Pending
    </span>
  );
}

function statusIcon(status: ClaimStatus) {
  if (status === ClaimStatus.Approved)
    return <CheckCircle2 className="w-4.5 h-4.5 text-secondary-foreground" />;
  if (status === ClaimStatus.Rejected)
    return <XCircle className="w-4.5 h-4.5 text-destructive" />;
  return <Clock className="w-4.5 h-4.5 text-accent-foreground" />;
}

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export default function MemberContributionsPage() {
  const { data: claims, isLoading } = useMyClaims();
  const { data: stats } = useStats();

  const approvedCount = stats ? Number(stats.approvedCount) : 0;
  const totalAmount = stats ? Number(stats.totalApprovedAmount) : 0;

  return (
    <Layout>
      <div className="px-4 py-5">
        {/* Stats banner */}
        <div
          className="rounded-2xl p-4 mb-5 bg-secondary/15 border border-secondary/25 relative overflow-hidden"
          data-ocid="contributions.stats_panel"
        >
          <div className="absolute right-3 top-3 w-20 h-20 rounded-full bg-secondary/10 -translate-y-4 translate-x-4" />
          <div className="flex items-center gap-3 relative">
            <div className="w-12 h-12 rounded-2xl bg-secondary/30 flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-secondary-foreground fill-current opacity-70" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-0.5">
                Total Approved
              </p>
              <p className="font-display font-bold text-2xl text-foreground">
                GHS {totalAmount.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {approvedCount} approved contribution
                {approvedCount !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        <h2 className="font-display font-bold text-lg text-foreground mb-4">
          My Contributions
        </h2>

        {isLoading && (
          <div className="space-y-3" data-ocid="contributions.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 w-full rounded-xl" />
            ))}
          </div>
        )}

        {!isLoading && (!claims || claims.length === 0) && (
          <div
            className="flex flex-col items-center justify-center py-14 text-center"
            data-ocid="contributions.empty_state"
          >
            <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-secondary/60" />
            </div>
            <p className="font-display font-semibold text-foreground text-lg">
              No contributions yet
            </p>
            <p className="text-muted-foreground text-sm mt-1 mb-4">
              Use the Submit tab to log your first contribution.
            </p>
            <Link
              to="/member/submit"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm rounded-xl px-5 py-3 min-h-[48px] transition-colors hover:bg-primary/90"
              data-ocid="contributions.submit_cta_link"
            >
              <PlusCircle className="w-4 h-4" />
              Submit Your First Contribution
            </Link>
          </div>
        )}

        <div className="space-y-3" data-ocid="contributions.list">
          {[...(claims ?? [])]
            .sort((a, b) => Number(b.createdAt - a.createdAt))
            .map((claim, i) => (
              <div
                key={claim.id.toString()}
                className="bg-card rounded-xl border border-border p-4 shadow-sm"
                data-ocid={`contributions.item.${i + 1}`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {statusIcon(claim.status)}
                      <span className="font-display font-bold text-lg text-foreground">
                        GHS {Number(claim.amount).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(claim.createdAt)}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {statusBadge(claim.status)}
                  </div>
                </div>
                {claim.notes && claim.notes.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-2 bg-muted/30 rounded-lg px-3 py-2">
                    {claim.notes}
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}
