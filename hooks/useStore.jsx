import { create } from "zustand";

export const useStore = create((set) => ({
  isCinematic: true,
  setIsCinematic: (isCinematic) => set({ isCinematic }),
}));
