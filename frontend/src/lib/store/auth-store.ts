import { StateCreator } from 'zustand';
import { authAPI, User, LoginCredentials, RegisterData } from '@/lib/api/auth';

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  clearError: () => void;
}

export const authStore: StateCreator<AuthState> = (set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.login(credentials);
      set({
        user: response.user,
        token: response.token,
        isLoading: false,
      });
      localStorage.setItem('auth_token', response.token);
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Login failed',
        isLoading: false,
      });
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.register(data);
      set({
        user: response.user,
        token: response.token,
        isLoading: false,
      });
      localStorage.setItem('auth_token', response.token);
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Registration failed',
        isLoading: false,
      });
    }
  },

  logout: () => {
    authAPI.logout().catch(console.error);
    set({
      user: null,
      token: null,
    });
    localStorage.removeItem('auth_token');
  },

  updateUser: (user: Partial<User>) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...user } : null,
    }));
  },

  clearError: () => {
    set({ error: null });
  },
});