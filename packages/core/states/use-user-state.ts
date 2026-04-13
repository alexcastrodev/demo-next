import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  token: string | null;
  setToken: (token: string) => void;
  clear: () => void;
}

export const useUserState = create<UserState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      clear: () => set({ token: null }),
    }),
    {
      name: 'user-state',
      partialize: (state) => ({ token: state.token }),
    }
  )
);
