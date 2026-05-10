import type { backendInterface } from "../backend";
import { ClaimStatus, Role } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

export const mockBackend: backendInterface = {
  login: async (userId, _password) => ({
    __kind__: "Ok",
    Ok: {
      userId,
      displayName: userId === "admin" ? "Pastor John" : "Youth Member",
      role: userId === "admin" ? Role.Admin : Role.Member,
    },
  }),

  adminRegisterUser: async () => true,
  registerMember: async () => true,
  getRole: async () => Role.Member,

  listAnnouncements: async () => [
    {
      id: 1n,
      title: "Sunday Service — 9 AM",
      body: "Join us this Sunday for worship, prayer, and fellowship. All youth welcome!",
      createdAt: now,
      authorId: "admin",
    },
    {
      id: 2n,
      title: "Youth Camp Registration Open",
      body: "Register now for our annual youth camp in August. Limited spaces available.",
      createdAt: now - 86_400_000_000_000n,
      authorId: "admin",
    },
  ],

  createAnnouncement: async () => 3n,
  deleteAnnouncement: async () => true,

  getMyClaims: async () => [
    {
      id: 1n,
      memberId: "youth01",
      amount: 50n,
      notes: "Sunday offering",
      status: ClaimStatus.Approved,
      createdAt: now - 7_200_000_000_000n,
    },
    {
      id: 2n,
      memberId: "youth01",
      amount: 20n,
      notes: "Volunteer service contribution",
      status: ClaimStatus.Pending,
      createdAt: now,
    },
  ],

  getMyStats: async () => ({ approvedCount: 1n, totalApprovedAmount: 50n }),

  getPendingClaims: async () => [
    {
      id: 2n,
      memberId: "youth01",
      amount: 20n,
      notes: "Volunteer service contribution",
      status: ClaimStatus.Pending,
      createdAt: now,
    },
  ],

  listAllClaims: async () => [
    {
      id: 1n,
      memberId: "youth01",
      amount: 50n,
      notes: "Sunday offering",
      status: ClaimStatus.Approved,
      createdAt: now - 7_200_000_000_000n,
    },
    {
      id: 2n,
      memberId: "youth02",
      amount: 20n,
      notes: "Volunteer service contribution",
      status: ClaimStatus.Pending,
      createdAt: now,
    },
    {
      id: 3n,
      memberId: "youth03",
      amount: 30n,
      notes: "Event fundraiser",
      status: ClaimStatus.Rejected,
      createdAt: now - 3_600_000_000_000n,
    },
  ],

  approveClaim: async () => true,
  rejectClaim: async () => true,
  submitClaim: async () => 3n,
};
