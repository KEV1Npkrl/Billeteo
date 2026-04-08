import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: null,
  isLoading: false,
  setUser: (user: User | null) => set({ user }),
  setToken: (token: string | null) => set({ token }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('token');
  },
}));

interface UIState {
  isSidebarOpen: boolean;
  theme: 'light' | 'dark';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>(set => ({
  isSidebarOpen: true,
  theme: 'light',
  toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
  setTheme: (theme: 'light' | 'dark') => {
    set({ theme });
    localStorage.setItem('theme', theme);
  },
}));
