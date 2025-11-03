import { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/lib/store';
import { authAPI, LoginCredentials, RegisterData, User } from '@/lib/api/auth';
import { AuthService } from '@/lib/auth/auth';
import { notificationService } from '@/lib/services/notification-service';

export interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const {
    user,
    token,
    isLoading,
    error,
    login: storeLogin,
    register: storeRegister,
    logout: storeLogout,
    updateUser,
    clearError,
  } = useStore();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      await storeLogin(credentials);
      notificationService.success('Welcome back!', 'You have successfully logged in.');
    } catch (error) {
      throw error;
    }
  }, [storeLogin]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      await storeRegister(data);
      notificationService.success('Welcome!', 'Your account has been created successfully.');
    } catch (error) {
      throw error;
    }
  }, [storeRegister]);

  const logout = useCallback(() => {
    storeLogout();
    notificationService.info('Logged out', 'You have been successfully logged out.');
  }, [storeLogout]);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    try {
      const updatedUser = await authAPI.updateProfile(data);
      updateUser(updatedUser);
      notificationService.success('Profile Updated', 'Your profile has been updated successfully.');
    } catch (error: any) {
      notificationService.error('Update Failed', error.response?.data?.message || 'Failed to update profile');
      throw error;
    }
  }, [updateUser]);

  const refreshUser = useCallback(async () => {
    if (!AuthService.isAuthenticated()) return;
    
    setIsRefreshing(true);
    try {
      const currentUser = await authAPI.getCurrentUser();
      updateUser(currentUser);
    } catch (error) {
      console.error('Failed to refresh user:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [updateUser]);

  // Auto-refresh user on mount if authenticated
  useEffect(() => {
    if (AuthService.isAuthenticated() && !user) {
      refreshUser();
    }
  }, [user, refreshUser]);

  return {
    user,
    isAuthenticated: AuthService.isAuthenticated(),
    isLoading: isLoading || isRefreshing,
    error,
    login,
    register,
    logout,
    updateProfile,
    clearError,
    refreshUser,
  };
};