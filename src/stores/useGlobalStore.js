import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useGlobalStore = create(
  persist(
    (set, get) => ({
      userToken: null,
      setUserToken: (token) => set({ userToken: token }),
      clearUserToken: () => set({ userToken: null }),
      
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),

      homeFlash: null,
      setHomeFlash: (flash) => set({ homeFlash: flash })
    }),
    {
      name: "global-store",
      version: 0,
      partialize: (state) => (Object.fromEntries(
        Object.entries(state).filter(([key]) => {
          const persistList = ["userToken"]
          return persistList.includes(key)
        })
      ))
    }
  ),
)