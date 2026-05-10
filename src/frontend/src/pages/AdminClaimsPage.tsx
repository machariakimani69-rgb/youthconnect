import { ClaimStatus } from "@/backend";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useAllClaims,
  useApproveClaim,
  useRejectClaim,
} from "@/hooks/useClaims";
import type { Claim } from "@/types";
import { CheckCircle2, Clock, Coins, Users, XCircle } from "lucide-react";
import { useState } from "react";

type FilterTab = "all" | "pending" | "approved" | "rejected";

function formatDate(ts: bigint) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: ClaimStatus }) {
  if (status === ClaimStatus.Pending) {
    return (
      <Badge className="bg-accent/20 text-accent-foreground border-accent/30 font-semibold">
        Pending
      </Badge>
    );
  }
  if (status === ClaimStatus.Approved) {
    return (
      <Badge className="bg-secondary/20 text-secondary-foreground border-secondary/30 font-semibold">
        Approved
      </Badge>
    );
  }
  return (
    <Badge className="bg-destructive/15 text-destructive border-destructive/30 font-semibold">
      Rejected
    </Badge>
  );
}

function accentBar(status: ClaimStatus) {
  if (status === ClaimStatus.Approved) return "bg-secondary";
  if (status === ClaimStatus.Rejected) return "bg-destructive/60";
  return "bg-accent";
}

function ClaimCard({
  claim,
  index,
  approve,
  reject,
  isMutating,
}: {
  claim: Claim;
  index: number;
  approve: (id: bigint) => void;
  reject: (id: bigint) => void;
  isMutating: boolean;
}) {
  const isPending = claim.status === ClaimStatus.Pending;

  return (
    <div
      className="bg-card rounded-2xl border border-border shadow-sm p-4"
      data-ocid={`claims.item.${index}`}
    >
      <div
        className={`w-12 h-1 rounded-full ${accentBar(claim.status)} mb-3`}
      />

      <div className="flex items-start justify-between mb-2">
        <div className="min-w-0 flex-1">
          <p className="font-display font-bold text-base text-foreground leading-tight">
            {claim.memberId}
          </p>
          <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{formatDate(claim.createdAt)}</span>
          </div>
        </div>
        <StatusBadge status={claim.status} />
      </div>

      <div className="flex items-center gap-1.5 bg-accent/10 rounded-lg px-3 py-2 mb-3">
        <Coins className="w-4 h-4 text-accent-foreground flex-shrink-0" />
        <span className="font-display font-bold text-sm text-accent-foreground">
          GHS {claim.amount.toString()}
        </span>
      </div>

      {claim.notes && (
        <p className="text-sm text-muted-foreground bg-muted/40 rounded-lg px-3 py-2 mb-3 line-clamp-3">
          {claim.notes}
        </p>
      )}

      {isPending && (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={() => reject(claim.id)}
            disabled={isMutating}
            className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/10 h-10"
            data-ocid={`claims.reject_button.${index}`}
          >
            <XCircle className="w-4 h-4 mr-1.5" />
            Reject
          </Button>
          <Button
            size="sm"
            type="button"
            onClick={() => approve(claim.id)}
            disabled={isMutating}
            className="flex-1 bg-secondary text-secondary-foreground hover:opacity-90 h-10"
            data-ocid={`claims.approve_button.${index}`}
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            Approve
          </Button>
        </div>
      )}
    </div>
  );
}

function EmptyState({ tab }: { tab: FilterTab }) {
  const messages: Record<
    FilterTab,
    { icon: string; title: string; sub: string }
  > = {
    all: {
      icon: "👥",
      title: "No claims yet",
      sub: "Members haven't submitted any contribution claims.",
    },
    pending: {
      icon: "✅",
      title: "All caught up!",
      sub: "No pending claims to review.",
    },
    approved: {
      icon: "🎉",
      title: "No approved claims",
      sub: "Approved claims will appear here.",
    },
    rejected: {
      icon: "📭",
      title: "No rejected claims",
      sub: "Rejected claims will appear here.",
    },
  };
  const m = messages[tab];
  return (
    <div
      className="flex flex-col items-center justify-center py-14 text-center"
      data-ocid="claims.empty_state"
    >
      <div className="w-16 h-16 rounded-full bg-muted/60 flex items-center justify-center mb-4 text-3xl">
        {m.icon}
      </div>
      <p className="font-display font-semibold text-foreground text-lg">
        {m.title}
      </p>
      <p className="text-muted-foreground text-sm mt-1 max-w-xs">{m.sub}</p>
    </div>
  );
}

export default function AdminClaimsPage() {
  const { data: claims, isLoading } = useAllClaims();
  const approve = useApproveClaim();
  const reject = useRejectClaim();
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const isMutating = approve.isPending || reject.isPending;

  const filtered = (claims ?? []).filter((c) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return c.status === ClaimStatus.Pending;
    if (activeTab === "approved") return c.status === ClaimStatus.Approved;
    return c.status === ClaimStatus.Rejected;
  });

  const pendingCount = (claims ?? []).filter(
    (c) => c.status === ClaimStatus.Pending,
  ).length;

  return (
    <Layout>
      <div className="px-4 py-5">
        {/* Page header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">
              Member Claims
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {(claims ?? []).length} total
            </p>
          </div>
          {pendingCount > 0 && (
            <Badge className="bg-accent/20 text-accent-foreground border-accent/30 font-semibold text-xs">
              {pendingCount} pending
            </Badge>
          )}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-3" data-ocid="claims.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-36 w-full rounded-xl" />
            ))}
          </div>
        )}

        {/* Tabs + Content */}
        {!isLoading && (
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as FilterTab)}
          >
            <TabsList className="w-full mb-4" data-ocid="claims.filter.tab">
              <TabsTrigger value="all" className="flex-1 text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="pending" className="flex-1 text-xs">
                Pending
                {pendingCount > 0 && (
                  <span className="ml-1 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 inline-flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved" className="flex-1 text-xs">
                Approved
              </TabsTrigger>
              <TabsTrigger value="rejected" className="flex-1 text-xs">
                Rejected
              </TabsTrigger>
            </TabsList>

            {(["all", "pending", "approved", "rejected"] as FilterTab[]).map(
              (tab) => (
                <TabsContent key={tab} value={tab} className="mt-0">
                  {filtered.length === 0 ? (
                    <EmptyState tab={tab} />
                  ) : (
                    <div className="space-y-3" data-ocid="claims.list">
                      {filtered.map((claim, i) => (
                        <ClaimCard
                          key={claim.id.toString()}
                          claim={claim}
                          index={i + 1}
                          approve={(id) => approve.mutate(id)}
                          reject={(id) => reject.mutate(id)}
                          isMutating={isMutating}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              ),
            )}
          </Tabs>
        )}
      </div>
    </Layout>
  );
}
