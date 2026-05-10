import { createActor } from "@/backend";
import type { Claim } from "@/backend";
import { useAuth } from "@/hooks/useAuth";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useMyClaims() {
  const { actor, isFetching } = useActor(createActor);
  const { user } = useAuth();

  return useQuery<Claim[]>({
    queryKey: ["claims", "mine", user?.userId],
    queryFn: async () => {
      if (!actor || !user) return [];
      return actor.getMyClaims(user.userId);
    },
    enabled: !!actor && !isFetching && !!user,
  });
}

export function useAllClaims() {
  const { actor, isFetching } = useActor(createActor);
  const { user } = useAuth();

  return useQuery<Claim[]>({
    queryKey: ["claims", "all"],
    queryFn: async () => {
      if (!actor || !user) return [];
      return actor.listAllClaims(user.userId);
    },
    enabled: !!actor && !isFetching && !!user,
  });
}

export function useSubmitClaim() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({
      amount,
      notes,
    }: { amount: number; notes?: string }) => {
      if (!actor || !user) throw new Error("Not authenticated");
      return actor.submitClaim(user.userId, BigInt(amount), notes ?? null);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["claims"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    },
  });
}

export function useApproveClaim() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor || !user) throw new Error("Not authenticated");
      return actor.approveClaim(user.userId, id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["claims"] }),
  });
}

export function useRejectClaim() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor || !user) throw new Error("Not authenticated");
      return actor.rejectClaim(user.userId, id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["claims"] }),
  });
}
