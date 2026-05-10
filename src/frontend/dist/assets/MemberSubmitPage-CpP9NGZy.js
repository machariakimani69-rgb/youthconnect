import { r as reactExports, j as jsxRuntimeExports, L as Link } from "./index-DmXpI9nT.js";
import { u as useAuth, L as Layout } from "./Layout-4A_6Bvte.js";
import { B as Button } from "./button-DPpVTwsd.js";
import { L as Label, I as Input, a as LoaderCircle } from "./loader-circle-BiFM0_qC.js";
import { T as Textarea } from "./textarea-BX6IdyGO.js";
import { d as useSubmitClaim } from "./useClaims-DHwaKfZ-.js";
import { H as Heart } from "./heart-BctSybMk.js";
import { C as CircleCheck } from "./circle-check-CXqaGD7u.js";
function MemberSubmitPage() {
  const submitClaim = useSubmitClaim();
  const { user } = useAuth();
  const [amount, setAmount] = reactExports.useState("");
  const [notes, setNotes] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  async function handleSubmit(e) {
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
        notes: notes.trim() || void 0
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-5 h-5 text-accent-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Submit Contribution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your leader will review and approve it" })
      ] })
    ] }),
    user && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-primary/8 rounded-xl px-4 py-3 mb-5 flex items-center gap-3 border border-primary/15",
        "data-ocid": "submit.member_badge",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-primary", children: user.displayName.charAt(0).toUpperCase() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Submitting as" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: user.displayName })
          ] })
        ]
      }
    ),
    success ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-2xl border border-secondary/30 shadow-sm p-6 text-center",
        "data-ocid": "submit.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-secondary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Claim Submitted!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Your contribution has been logged. Your leader will review and approve it shortly." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSubmitAnother,
                className: "w-full h-12 text-base font-semibold rounded-xl bg-primary text-primary-foreground transition-colors hover:bg-primary/90",
                "data-ocid": "submit.submit_another_button",
                children: "Submit Another"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/member/contributions",
                className: "w-full h-12 text-base font-semibold rounded-xl border border-border bg-card text-foreground flex items-center justify-center transition-colors hover:bg-muted/50",
                "data-ocid": "submit.view_history_link",
                children: "View My Contributions"
              }
            )
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-2xl border border-border shadow-sm p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "space-y-5",
        "data-ocid": "submit.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "amount", className: "text-sm font-medium", children: "Amount (GHS)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold text-sm", children: "GHS" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "amount",
                  type: "number",
                  inputMode: "numeric",
                  placeholder: "0",
                  value: amount,
                  onChange: (e) => setAmount(e.target.value),
                  className: "h-12 text-base pl-12",
                  min: "1",
                  "data-ocid": "submit.amount_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "notes", className: "text-sm font-medium", children: [
              "Notes",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "notes",
                placeholder: "e.g. Sunday offering, volunteer service hours…",
                value: notes,
                onChange: (e) => setNotes(e.target.value),
                rows: 4,
                className: "text-base resize-none",
                "data-ocid": "submit.notes_textarea"
              }
            )
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-destructive text-sm font-medium bg-destructive/10 rounded-lg px-3 py-2",
              "data-ocid": "submit.error_state",
              children: error
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: submitClaim.isPending,
              className: "w-full h-12 text-base font-semibold",
              "data-ocid": "submit.submit_button",
              children: submitClaim.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                "Submitting…"
              ] }) : "Submit Claim"
            }
          )
        ]
      }
    ) }),
    !success && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 rounded-xl p-4 mt-4 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "How it works:" }),
      " Submit your contribution amount and any notes. Your church leader will review and approve or reject your claim. Approved contributions will appear in your contributions history."
    ] }) })
  ] }) });
}
export {
  MemberSubmitPage as default
};
