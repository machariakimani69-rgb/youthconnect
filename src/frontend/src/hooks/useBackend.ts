import { createActor } from "@/backend";
import { useAuthStore } from "@/store/auth";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";

export function useActorClient() {
  return useActor(createActor);
}

export function useLogin() {
  const { actor } = useActorClient();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: async ({
      userId,
      password,
    }: { userId: string; password: string }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.login(userId, password);
      if (result.__kind__ === "Ok") {
        setUser(result.Ok);
        return result.Ok;
      }
      throw new Error("Invalid credentials. Please try again.");
    },
  });
}
