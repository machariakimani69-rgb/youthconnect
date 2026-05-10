import { h as useQueryClient, c as createActor } from "./index-DmXpI9nT.js";
import { u as useAuth } from "./Layout-4A_6Bvte.js";
import { a as useActor, b as useQuery, u as useMutation } from "./heart-BctSybMk.js";
function useMyClaims() {
  const { actor, isFetching } = useActor(createActor);
  const { user } = useAuth();
  return useQuery({
    queryKey: ["claims", "mine", user == null ? void 0 : user.userId],
    queryFn: async () => {
      if (!actor || !user) return [];
      return actor.getMyClaims(user.userId);
    },
    enabled: !!actor && !isFetching && !!user
  });
}
function useAllClaims() {
  const { actor, isFetching } = useActor(createActor);
  const { user } = useAuth();
  return useQuery({
    queryKey: ["claims", "all"],
    queryFn: async () => {
      if (!actor || !user) return [];
      return actor.listAllClaims(user.userId);
    },
    enabled: !!actor && !isFetching && !!user
  });
}
function useSubmitClaim() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      amount,
      notes
    }) => {
      if (!actor || !user) throw new Error("Not authenticated");
      return actor.submitClaim(user.userId, BigInt(amount), notes ?? null);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["claims"] });
      qc.invalidateQueries({ queryKey: ["stats"] });
    }
  });
}
function useApproveClaim() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor || !user) throw new Error("Not authenticated");
      return actor.approveClaim(user.userId, id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["claims"] })
  });
}
function useRejectClaim() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor || !user) throw new Error("Not authenticated");
      return actor.rejectClaim(user.userId, id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["claims"] })
  });
}
export {
  useApproveClaim as a,
  useRejectClaim as b,
  useMyClaims as c,
  useSubmitClaim as d,
  useAllClaims as u
};
