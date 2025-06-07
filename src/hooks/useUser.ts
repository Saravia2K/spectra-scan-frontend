// src/store/useAuthStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Doctor {
  id: number;
  names: string;
  last_names: string;
  email: string;
}

interface AuthState {
  doctor: Doctor | null;
  token?: string; // si usas JWT más adelante
  isAuthenticated: boolean;
  login: (doctor: Doctor, token?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      doctor: null,
      token: undefined,
      isAuthenticated: false,
      login: (doctor, token) =>
        set({
          doctor,
          token,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          doctor: null,
          token: undefined,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", // nombre en localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
