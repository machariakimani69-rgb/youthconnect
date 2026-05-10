import { h as useQueryClient, c as createActor } from "./index-DmXpI9nT.js";
import { u as useAuth } from "./Layout-4A_6Bvte.js";
import { a as useActor, b as useQuery, u as useMutation } from "./heart-BctSybMk.js";
function useAnnouncements() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAnnouncements();
    },
    enabled: !!actor && !isFetching,
    staleTime: 6e4,
    refetchOnWindowFocus: true
  });
}
function useCreateAnnouncement() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ title, body }) => {
      if (!actor || !user) throw new Error("Not authenticated");
      return actor.createAnnouncement(user.userId, title, body);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] })
  });
}
function useDeleteAnnouncement() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor || !user) throw new Error("Not authenticated");
      return actor.deleteAnnouncement(user.userId, id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] })
  });
}
export {
  useDeleteAnnouncement as a,
  useCreateAnnouncement as b,
  useAnnouncements as u
};
