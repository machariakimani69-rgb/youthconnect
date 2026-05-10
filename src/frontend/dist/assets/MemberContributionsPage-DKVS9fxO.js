import { c as createActor, j as jsxRuntimeExports, S as Skeleton, L as Link, C as ClaimStatus } from "./index-DmXpI9nT.js";
import { u as useAuth, L as Layout, C as CirclePlus } from "./Layout-4A_6Bvte.js";
import { c as useMyClaims } from "./useClaims-DHwaKfZ-.js";
import { a as useActor, b as useQuery, H as Heart } from "./heart-BctSybMk.js";
import { C as CircleCheck } from "./circle-check-CXqaGD7u.js";
import { C as CircleX } from "./circle-x-6w9mL7i1.js";
import { C as Clock } from "./clock-57R2usJ2.js";
function useStats() {
  const { actor, isFetching } = useActor(createActor);
  const { user } = useAuth();
  return useQuery({
    queryKey: ["stats", user == null ? void 0 : user.userId],
    queryFn: async () => {
      if (!actor || !user)
        return { approvedCount: 0n, totalApprovedAmount: 0n };
      return actor.getMyStats(user.userId);
    },
    enabled: !!actor && !isFetching && !!user
  });
}
function statusBadge(status) {
  if (status === ClaimStatus.Approved)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-secondary/20 text-secondary-foreground border border-secondary/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
      "Approved"
    ] });
  if (status === ClaimStatus.Rejected)
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-destructive/10 text-destructive border border-destructive/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-3 h-3" }),
      "Rejected"
    ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold bg-accent/20 text-accent-foreground border border-accent/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
    "Pending"
  ] });
}
function statusIcon(status) {
  if (status === ClaimStatus.Approved)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4.5 h-4.5 text-secondary-foreground" });
  if (status === ClaimStatus.Rejected)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4.5 h-4.5 text-destructive" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4.5 h-4.5 text-accent-foreground" });
}
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });
}
function MemberContributionsPage() {
  const { data: claims, isLoading } = useMyClaims();
  const { data: stats } = useStats();
  const approvedCount = stats ? Number(stats.approvedCount) : 0;
  const totalAmount = stats ? Number(stats.totalApprovedAmount) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded-2xl p-4 mb-5 bg-secondary/15 border border-secondary/25 relative overflow-hidden",
        "data-ocid": "contributions.stats_panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute right-3 top-3 w-20 h-20 rounded-full bg-secondary/10 -translate-y-4 translate-x-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl bg-secondary/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-6 h-6 text-secondary-foreground fill-current opacity-70" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground mb-0.5", children: "Total Approved" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-2xl text-foreground", children: [
                "GHS ",
                totalAmount.toLocaleString()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                approvedCount,
                " approved contribution",
                approvedCount !== 1 ? "s" : ""
              ] })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground mb-4", children: "My Contributions" }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "contributions.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 w-full rounded-xl" }, i)) }),
    !isLoading && (!claims || claims.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-14 text-center",
        "data-ocid": "contributions.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-8 h-8 text-secondary/60" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg", children: "No contributions yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 mb-4", children: "Use the Submit tab to log your first contribution." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/member/submit",
              className: "inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm rounded-xl px-5 py-3 min-h-[48px] transition-colors hover:bg-primary/90",
              "data-ocid": "contributions.submit_cta_link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-4 h-4" }),
                "Submit Your First Contribution"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "contributions.list", children: [...claims ?? []].sort((a, b) => Number(b.createdAt - a.createdAt)).map((claim, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-xl border border-border p-4 shadow-sm",
        "data-ocid": `contributions.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                statusIcon(claim.status),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-lg text-foreground", children: [
                  "GHS ",
                  Number(claim.amount).toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(claim.createdAt) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: statusBadge(claim.status) })
          ] }),
          claim.notes && claim.notes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 bg-muted/30 rounded-lg px-3 py-2", children: claim.notes })
        ]
      },
      claim.id.toString()
    )) })
  ] }) });
}
export {
  MemberContributionsPage as default
};
