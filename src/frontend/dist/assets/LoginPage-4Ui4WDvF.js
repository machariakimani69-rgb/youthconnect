import { u as useAuthStore, c as createActor, a as useNavigate, r as reactExports, R as Role, j as jsxRuntimeExports } from "./index-DmXpI9nT.js";
import { B as Button } from "./button-DPpVTwsd.js";
import { L as Label, I as Input, a as LoaderCircle } from "./loader-circle-BiFM0_qC.js";
import { u as useMutation, a as useActor, H as Heart } from "./heart-BctSybMk.js";
function useActorClient() {
  return useActor(createActor);
}
function useLogin() {
  const { actor } = useActorClient();
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: async ({
      userId,
      password
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.login(userId, password);
      if (result.__kind__ === "Ok") {
        setUser(result.Ok);
        return result.Ok;
      }
      throw new Error("Invalid credentials. Please try again.");
    }
  });
}
function LoginPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const login = useLogin();
  const [userId, setUserId] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (user) {
      if (user.role === Role.Admin) navigate({ to: "/admin/announcements" });
      else navigate({ to: "/member/announcements" });
    }
  }, [user, navigate]);
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!userId.trim() || !password.trim()) {
      setError("Please enter your ID and password.");
      return;
    }
    try {
      await login.mutateAsync({ userId: userId.trim(), password });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary flex flex-col items-center justify-center pt-16 pb-12 px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-10 h-10 text-primary-foreground fill-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl text-primary-foreground text-center leading-tight", children: "YouthConnect" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/75 text-sm mt-2 text-center", children: "Stay connected with your church community" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 px-5 -mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl shadow-lg border border-border p-6 max-w-sm mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-1", children: "Welcome back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-6", children: "Sign in to your account to continue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "space-y-5",
          "data-ocid": "login.form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "userId", className: "text-sm font-medium", children: "Member ID" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "userId",
                  type: "text",
                  autoCapitalize: "none",
                  autoCorrect: "off",
                  placeholder: "e.g. youth01",
                  value: userId,
                  onChange: (e) => setUserId(e.target.value),
                  className: "h-12 text-base",
                  "data-ocid": "login.input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", className: "text-sm font-medium", children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "password",
                  type: "password",
                  placeholder: "Enter your password",
                  value: password,
                  onChange: (e) => setPassword(e.target.value),
                  className: "h-12 text-base",
                  "data-ocid": "login.password_input"
                }
              )
            ] }),
            error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-destructive text-sm font-medium bg-destructive/10 rounded-lg px-3 py-2",
                "data-ocid": "login.error_state",
                children: error
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: login.isPending,
                className: "w-full h-12 text-base font-semibold",
                "data-ocid": "login.submit_button",
                children: login.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                  "Signing in…"
                ] }) : "Sign In"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs text-center mt-5", children: "New member? Contact your church leader to get access." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "text-center py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
          className: "underline hover:text-primary",
          target: "_blank",
          rel: "noopener noreferrer",
          children: "caffeine.ai"
        }
      )
    ] }) })
  ] });
}
export {
  LoginPage as default
};
