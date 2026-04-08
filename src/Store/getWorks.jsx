import { create } from "zustand";
import { client } from "../lib/microcms";

const useWorkStore = create((set) => ({
  works: [],
  isLoading: false,
  error: null,
  fetchWorks: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await client.get({
        endpoint: "works",
      });
      set({ works: data.contents, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error("fetchWorks error:", error);
    }
  },
}));

export default useWorkStore;
