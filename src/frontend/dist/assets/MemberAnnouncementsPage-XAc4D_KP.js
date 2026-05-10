import { j as jsxRuntimeExports, S as Skeleton } from "./index-DmXpI9nT.js";
import { L as Layout, B as Bell } from "./Layout-4A_6Bvte.js";
import { u as useAnnouncements } from "./useAnnouncements-DdcmbPTh.js";
import { C as Clock } from "./clock-57R2usJ2.js";
import "./heart-BctSybMk.js";
function formatDate(ts) {
  return new Date(Number(ts)).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function MemberAnnouncementsPage() {
  const { data: announcements, isLoading } = useAnnouncements();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-5", children: "Church Updates" }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "announcements.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 w-full rounded-xl" }, i)) }),
    !isLoading && (!announcements || announcements.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-16 text-center",
        "data-ocid": "announcements.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-8 h-8 text-primary/60" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg", children: "No updates yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 max-w-xs", children: "Check back soon for announcements from your leaders." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "announcements.list", children: [...announcements ?? []].sort((a, b) => Number(b.createdAt - a.createdAt)).map((a, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-xl border-l-4 border-l-primary border border-border p-4 shadow-sm",
        "data-ocid": `announcements.item.${i + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold tracking-widest text-primary uppercase mb-2", children: "Announcement" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base text-foreground leading-snug mb-2", children: a.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: a.body }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-3 text-muted-foreground text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3.5 h-3.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              formatDate(a.createdAt),
              " ·",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground/70", children: a.authorId })
            ] })
          ] })
        ]
      },
      a.id.toString()
    )) })
  ] }) });
}
export {
  MemberAnnouncementsPage as default
};
