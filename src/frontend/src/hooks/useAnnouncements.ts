import { createActor } from "@/backend";
import type { Announcement } from "@/backend";
import { useAuth } from "@/hooks/useAuth";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAnnouncements() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Announcement[]>({
    queryKey: ["announcements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAnnouncements();
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
    refetchOnWindowFocus: true,
  });
}

export function useCreateAnnouncement() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, body }: { title: string; body: string }) => {
      if (!actor || !user) throw new Error("Not authenticated");
      return actor.createAnnouncement(user.userId, title, body);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}

export function useDeleteAnnouncement() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor || !user) throw new Error("Not authenticated");
      return actor.deleteAnnouncement(user.userId, id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}
