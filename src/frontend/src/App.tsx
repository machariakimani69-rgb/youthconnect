import { Role } from "@/backend";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthStore } from "@/store/auth";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const LoginPage = lazy(() => import("@/pages/LoginPage"));
const AdminAnnouncementsPage = lazy(
  () => import("@/pages/AdminAnnouncementsPage"),
);
const AdminClaimsPage = lazy(() => import("@/pages/AdminClaimsPage"));
const AdminPostPage = lazy(() => import("@/pages/AdminPostPage"));
const MemberAnnouncementsPage = lazy(
  () => import("@/pages/MemberAnnouncementsPage"),
);
const MemberContributionsPage = lazy(
  () => import("@/pages/MemberContributionsPage"),
);
const MemberSubmitPage = lazy(() => import("@/pages/MemberSubmitPage"));

function PageLoader() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

function getUser() {
  return useAuthStore.getState().user;
}

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    const user = getUser();
    if (!user) throw redirect({ to: "/login" });
    if (user.role === Role.Admin)
      throw redirect({ to: "/admin/announcements" });
    throw redirect({ to: "/member/announcements" });
  },
  component: () => null,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const adminAnnouncementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/announcements",
  beforeLoad: () => {
    const user = getUser();
    if (!user) throw redirect({ to: "/login" });
    if (user.role !== Role.Admin)
      throw redirect({ to: "/member/announcements" });
  },
  component: AdminAnnouncementsPage,
});

const adminClaimsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/claims",
  beforeLoad: () => {
    const user = getUser();
    if (!user) throw redirect({ to: "/login" });
    if (user.role !== Role.Admin)
      throw redirect({ to: "/member/announcements" });
  },
  component: AdminClaimsPage,
});

const adminPostRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/post",
  beforeLoad: () => {
    const user = getUser();
    if (!user) throw redirect({ to: "/login" });
    if (user.role !== Role.Admin)
      throw redirect({ to: "/member/announcements" });
  },
  component: AdminPostPage,
});

const memberAnnouncementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/member/announcements",
  beforeLoad: () => {
    const user = getUser();
    if (!user) throw redirect({ to: "/login" });
  },
  component: MemberAnnouncementsPage,
});

const memberContributionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/member/contributions",
  beforeLoad: () => {
    const user = getUser();
    if (!user) throw redirect({ to: "/login" });
  },
  component: MemberContributionsPage,
});

const memberSubmitRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/member/submit",
  beforeLoad: () => {
    const user = getUser();
    if (!user) throw redirect({ to: "/login" });
  },
  component: MemberSubmitPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  adminAnnouncementsRoute,
  adminClaimsRoute,
  adminPostRoute,
  memberAnnouncementsRoute,
  memberContributionsRoute,
  memberSubmitRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
