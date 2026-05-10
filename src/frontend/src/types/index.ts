// Re-export backend types for convenience
export { ClaimStatus, Role } from "@/backend";
export type { Announcement, Claim, MemberStats } from "@/backend";

export interface UserInfo {
  userId: string;
  role: import("@/backend").Role;
  displayName: string;
}
