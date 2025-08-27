import { User } from "@/types/user";
import { create } from "zustand";

type AuthStore = {
  isAuth: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuth: false,
  user: null,
  setUser: (user: User) => set({ isAuth: true, user }),
  clearAuth: () => set({ isAuth: false, user: null }),
}));
