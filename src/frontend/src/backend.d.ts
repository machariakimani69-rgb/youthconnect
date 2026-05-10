import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Claim {
    id: ClaimId;
    status: ClaimStatus;
    memberId: UserId;
    createdAt: Timestamp;
    notes?: string;
    amount: bigint;
}
export type UserId = string;
export type Timestamp = bigint;
export interface Announcement {
    id: AnnouncementId;
    title: string;
    authorId: UserId;
    body: string;
    createdAt: Timestamp;
}
export interface MemberStats {
    approvedCount: bigint;
    totalApprovedAmount: bigint;
}
export type LoginResult = {
    __kind__: "Ok";
    Ok: {
        displayName: string;
        userId: UserId;
        role: Role;
    };
} | {
    __kind__: "InvalidCredentials";
    InvalidCredentials: null;
};
export type AnnouncementId = bigint;
export type ClaimId = bigint;
export enum ClaimStatus {
    Approved = "Approved",
    Rejected = "Rejected",
    Pending = "Pending"
}
export enum Role {
    Member = "Member",
    Admin = "Admin"
}
export interface backendInterface {
    adminRegisterUser(callerId: UserId, newUserId: UserId, password: string, displayName: string, role: Role): Promise<boolean>;
    approveClaim(callerId: string, id: ClaimId): Promise<boolean>;
    createAnnouncement(callerId: string, title: string, body: string): Promise<AnnouncementId>;
    deleteAnnouncement(callerId: string, id: AnnouncementId): Promise<boolean>;
    getMyClaims(callerId: string): Promise<Array<Claim>>;
    getMyStats(callerId: string): Promise<MemberStats>;
    getPendingClaims(callerId: string): Promise<Array<Claim>>;
    getRole(userId: UserId): Promise<Role | null>;
    listAllClaims(callerId: string): Promise<Array<Claim>>;
    listAnnouncements(): Promise<Array<Announcement>>;
    login(userId: UserId, password: string): Promise<LoginResult>;
    registerMember(userId: UserId, password: string, displayName: string): Promise<boolean>;
    rejectClaim(callerId: string, id: ClaimId): Promise<boolean>;
    submitClaim(callerId: string, amount: bigint, notes: string | null): Promise<ClaimId>;
}
