import { create } from 'zustand';

interface User {
  email: string;
  id: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  loading: false,
  error: null,
  login: (token, user) => set({ token, user, loading: false, error: null }),
  logout: () => set({ token: null, user: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
