import { createActor } from "@/backend";
import type { MemberStats } from "@/backend";
import { useAuth } from "@/hooks/useAuth";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useStats() {
  const { actor, isFetching } = useActor(createActor);
  const { user } = useAuth();

  return useQuery<MemberStats>({
    queryKey: ["stats", user?.userId],
    queryFn: async () => {
      if (!actor || !user)
        return { approvedCount: 0n, totalApprovedAmount: 0n };
      return actor.getMyStats(user.userId);
    },
    enabled: !!actor && !isFetching && !!user,
  });
}
