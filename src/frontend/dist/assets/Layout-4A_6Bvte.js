import { u as useAuthStore, R as Role, k as useRouterState, j as jsxRuntimeExports, L as Link } from "./index-DmXpI9nT.js";
import { c as createLucideIcon, H as Heart } from "./heart-BctSybMk.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M8 12h8", key: "1wcyev" }],
  ["path", { d: "M12 8v8", key: "napkw2" }]
];
const CirclePlus = createLucideIcon("circle-plus", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m3 11 18-5v12L3 14v-3z", key: "n962bs" }],
  ["path", { d: "M11.6 16.8a3 3 0 1 1-5.8-1.6", key: "1yl0tm" }]
];
const Megaphone = createLucideIcon("megaphone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function useAuth() {
  const { user, setUser, logout } = useAuthStore();
  const isAuthenticated = user !== null;
  const isAdmin = (user == null ? void 0 : user.role) === Role.Admin;
  const isMember = (user == null ? void 0 : user.role) === Role.Member;
  function login(userInfo) {
    setUser(userInfo);
  }
  return {
    user,
    isAuthenticated,
    isAdmin,
    isMember,
    login,
    logout
  };
}
function Layout({ children, title }) {
  const { user, logout, isAdmin } = useAuth();
  const router = useRouterState();
  const pathname = router.location.pathname;
  const adminNav = [
    { to: "/admin/announcements", icon: Megaphone, label: "Announcements" },
    { to: "/admin/claims", icon: Users, label: "All Claims" },
    { to: "/admin/post", icon: CirclePlus, label: "Post" }
  ];
  const memberNav = [
    { to: "/member/announcements", icon: Bell, label: "Updates" },
    { to: "/member/contributions", icon: Heart, label: "Contributions" },
    { to: "/member/submit", icon: CirclePlus, label: "Submit" }
  ];
  const navItems = isAdmin ? adminNav : memberNav;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-primary sticky top-0 z-40 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 h-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "w-5 h-5 text-primary-foreground fill-primary-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-lg text-primary-foreground leading-tight truncate", children: title ?? "YouthConnect" }),
          user && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 text-xs truncate", children: user.displayName })
        ] })
      ] }),
      user && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: logout,
          className: "min-h-11 min-w-11 flex items-center justify-center rounded-lg bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25 transition-smooth",
          "aria-label": "Logout",
          "data-ocid": "header.logout_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-5 h-5" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto pb-20", children }),
    user && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "nav",
      {
        className: "fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40",
        "data-ocid": "bottom_nav",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-stretch justify-around", children: navItems.map(({ to, icon: Icon, label }) => {
          const isActive = pathname.startsWith(to);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to,
              className: `flex flex-col items-center justify-center gap-1 py-3 flex-1 transition-colors ${isActive ? "text-primary border-t-2 border-primary -mt-px" : "text-muted-foreground hover:text-foreground border-t-2 border-transparent -mt-px"}`,
              "data-ocid": `nav.${label.toLowerCase().replace(/\s+/g, "_")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Icon,
                  {
                    className: `w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-2"}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: label })
              ]
            },
            to
          );
        }) })
      }
    )
  ] });
}
export {
  Bell as B,
  CirclePlus as C,
  Layout as L,
  Megaphone as M,
  useAuth as u
};
