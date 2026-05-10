import { useAuth } from "@/hooks/useAuth";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Heart,
  LogOut,
  Megaphone,
  PlusCircle,
  Users,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const { user, logout, isAdmin } = useAuth();
  const router = useRouterState();
  const pathname = router.location.pathname;

  const adminNav = [
    { to: "/admin/announcements", icon: Megaphone, label: "Announcements" },
    { to: "/admin/claims", icon: Users, label: "All Claims" },
    { to: "/admin/post", icon: PlusCircle, label: "Post" },
  ];

  const memberNav = [
    { to: "/member/announcements", icon: Bell, label: "Updates" },
    { to: "/member/contributions", icon: Heart, label: "Contributions" },
    { to: "/member/submit", icon: PlusCircle, label: "Submit" },
  ];

  const navItems = isAdmin ? adminNav : memberNav;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary sticky top-0 z-40 shadow-md">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
            </div>
            <div className="min-w-0">
              <h1 className="font-display font-bold text-lg text-primary-foreground leading-tight truncate">
                {title ?? "YouthConnect"}
              </h1>
              {user && (
                <p className="text-primary-foreground/70 text-xs truncate">
                  {user.displayName}
                </p>
              )}
            </div>
          </div>
          {user && (
            <button
              type="button"
              onClick={logout}
              className="min-h-11 min-w-11 flex items-center justify-center rounded-lg bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25 transition-smooth"
              aria-label="Logout"
              data-ocid="header.logout_button"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">{children}</main>

      {/* Bottom Nav */}
      {user && (
        <nav
          className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40"
          data-ocid="bottom_nav"
        >
          <div className="flex items-stretch justify-around">
            {navItems.map(({ to, icon: Icon, label }) => {
              const isActive = pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex flex-col items-center justify-center gap-1 py-3 flex-1 transition-colors ${
                    isActive
                      ? "text-primary border-t-2 border-primary -mt-px"
                      : "text-muted-foreground hover:text-foreground border-t-2 border-transparent -mt-px"
                  }`}
                  data-ocid={`nav.${label.toLowerCase().replace(/\s+/g, "_")}`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-2"}`}
                  />
                  <span className="text-xs font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
