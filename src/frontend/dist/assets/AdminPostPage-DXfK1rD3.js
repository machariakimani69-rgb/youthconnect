import { a as useNavigate, r as reactExports, j as jsxRuntimeExports } from "./index-DmXpI9nT.js";
import { L as Layout, M as Megaphone } from "./Layout-4A_6Bvte.js";
import { B as Button } from "./button-DPpVTwsd.js";
import { L as Label, I as Input, a as LoaderCircle } from "./loader-circle-BiFM0_qC.js";
import { T as Textarea } from "./textarea-BX6IdyGO.js";
import { b as useCreateAnnouncement } from "./useAnnouncements-DdcmbPTh.js";
import { C as CircleCheck } from "./circle-check-CXqaGD7u.js";
import "./heart-BctSybMk.js";
const TITLE_MAX = 80;
const BODY_MAX = 500;
function AdminPostPage() {
  const createAnnouncement = useCreateAnnouncement();
  const navigate = useNavigate();
  const [title, setTitle] = reactExports.useState("");
  const [body, setBody] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  async function handleSubmit(e) {
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
        body: body.trim()
      });
      setSuccess(true);
      setTimeout(() => navigate({ to: "/admin/announcements" }), 1200);
    } catch {
      setError("Failed to post. Please try again.");
    }
  }
  const titleRemaining = TITLE_MAX - title.length;
  const bodyRemaining = BODY_MAX - body.length;
  const titleOver = titleRemaining < 0;
  const bodyOver = bodyRemaining < 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-11 h-11 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, { className: "w-5 h-5 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Post Announcement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Share updates with all members" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border shadow-sm p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "space-y-5",
        "data-ocid": "post.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "post-title", className: "text-sm font-medium", children: "Title" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `text-xs tabular-nums ${titleOver ? "text-destructive font-semibold" : titleRemaining <= 15 ? "text-accent-foreground" : "text-muted-foreground"}`,
                  children: [
                    title.length,
                    "/",
                    TITLE_MAX
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "post-title",
                placeholder: "e.g. Sunday Service Update",
                value: title,
                onChange: (e) => setTitle(e.target.value),
                maxLength: TITLE_MAX + 10,
                className: `h-12 text-base ${titleOver ? "border-destructive focus-visible:ring-destructive" : ""}`,
                "data-ocid": "post.title_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "post-body", className: "text-sm font-medium", children: "Message" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: `text-xs tabular-nums ${bodyOver ? "text-destructive font-semibold" : bodyRemaining <= 50 ? "text-accent-foreground" : "text-muted-foreground"}`,
                  children: [
                    body.length,
                    "/",
                    BODY_MAX
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "post-body",
                placeholder: "Write your announcement here…",
                value: body,
                onChange: (e) => setBody(e.target.value),
                maxLength: BODY_MAX + 20,
                rows: 6,
                className: `text-base resize-none ${bodyOver ? "border-destructive focus-visible:ring-destructive" : ""}`,
                "data-ocid": "post.textarea"
              }
            )
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-destructive text-sm font-medium bg-destructive/10 rounded-lg px-3 py-2.5",
              "data-ocid": "post.error_state",
              children: error
            }
          ),
          success && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-2 bg-secondary/15 rounded-lg px-3 py-2.5",
              "data-ocid": "post.success_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-secondary flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-secondary-foreground", children: "Posted! Taking you back…" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => navigate({ to: "/admin/announcements" }),
                className: "flex-1 h-12 text-base",
                "data-ocid": "post.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: createAnnouncement.isPending || success || titleOver || bodyOver,
                className: "flex-2 h-12 text-base font-semibold flex-[2]",
                "data-ocid": "post.submit_button",
                children: createAnnouncement.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  "Posting…"
                ] }) : "Post Announcement"
              }
            )
          ] })
        ]
      }
    ) })
  ] }) });
}
export {
  AdminPostPage as default
};
