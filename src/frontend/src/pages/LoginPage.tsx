import { Role } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useBackend";
import { useAuthStore } from "@/store/auth";
import { useNavigate } from "@tanstack/react-router";
import { Heart, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const login = useLogin();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      if (user.role === Role.Admin) navigate({ to: "/admin/announcements" });
      else navigate({ to: "/member/announcements" });
    }
  }, [user, navigate]);

  async function handleSubmit(e: React.FormEvent) {
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero banner */}
      <div className="bg-primary flex flex-col items-center justify-center pt-16 pb-12 px-6">
        <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-5">
          <Heart className="w-10 h-10 text-primary-foreground fill-primary-foreground" />
        </div>
        <h1 className="font-display font-bold text-3xl text-primary-foreground text-center leading-tight">
          YouthConnect
        </h1>
        <p className="text-primary-foreground/75 text-sm mt-2 text-center">
          Stay connected with your church community
        </p>
      </div>

      {/* Login card */}
      <div className="flex-1 px-5 -mt-6">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-6 max-w-sm mx-auto">
          <h2 className="font-display font-bold text-xl text-foreground mb-1">
            Welcome back
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Sign in to your account to continue
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            data-ocid="login.form"
          >
            <div className="space-y-2">
              <Label htmlFor="userId" className="text-sm font-medium">
                Member ID
              </Label>
              <Input
                id="userId"
                type="text"
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="e.g. youth01"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="h-12 text-base"
                data-ocid="login.input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-base"
                data-ocid="login.password_input"
              />
            </div>

            {error && (
              <p
                className="text-destructive text-sm font-medium bg-destructive/10 rounded-lg px-3 py-2"
                data-ocid="login.error_state"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={login.isPending}
              className="w-full h-12 text-base font-semibold"
              data-ocid="login.submit_button"
            >
              {login.isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="text-muted-foreground text-xs text-center mt-5">
            New member? Contact your church leader to get access.
          </p>
        </div>
      </div>

      <footer className="text-center py-6">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            className="underline hover:text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
