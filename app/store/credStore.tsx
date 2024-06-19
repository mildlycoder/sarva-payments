import { create } from "zustand";

export const useCredStore = create((set) => ({
  publicAddress: "",
  loggedIn: false,
  setCreds: async (addr) => {
    set({ 
      publicAddress: addr,
      loggedIn: true
    });
  },
}));
