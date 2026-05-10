import { Role } from "@/backend";
import { useAuthStore } from "@/store/auth";
import type { UserInfo } from "@/types";

export function useAuth() {
  const { user, setUser, logout } = useAuthStore();

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === Role.Admin;
  const isMember = user?.role === Role.Member;

  function login(userInfo: UserInfo) {
    setUser(userInfo);
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    isMember,
    login,
    logout,
  };
}
