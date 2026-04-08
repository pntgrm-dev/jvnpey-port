import { create } from "zustand";
import { client } from "../lib/microcms";

const useProfileStore = create((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await client.get({
        endpoint: "profile",
      });
      set({ profile: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error("fetchProfile error:", error);
    }
  },
}));

export default useProfileStore;
