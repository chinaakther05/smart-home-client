import { create } from "zustand";

export const useServiceStore = create((set) => ({
  selectedCount: 0,

  addService: () =>
    set((state) => ({
      selectedCount: state.selectedCount + 1,
    })),

  resetCount: () => set({ selectedCount: 0 }),
}));