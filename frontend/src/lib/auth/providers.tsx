'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { AuthService, initializeTheme } from './auth';
import { socketService } from '@/lib/socket/socket';

interface AuthContextType {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: any | null;
  initialize: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { user, token, updateUser } = useStore();

  const initialize = async () => {
    try {
      // Initialize theme
      initializeTheme();

      // Check authentication
      const isAuthenticated = AuthService.isAuthenticated();
      const storedToken = AuthService.getToken();

      if (isAuthenticated && storedToken) {
        // Set token in API client
        const { apiClient } = await import('@/lib/api/client');
        apiClient.setAuthToken(storedToken);

        // Fetch current user
        try {
          const { authAPI } = await import('@/lib/api/auth');
          const currentUser = await authAPI.getCurrentUser();
          updateUser(currentUser);

          // Connect to socket
          socketService.connect(storedToken);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          AuthService.clearTokens();
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      setIsInitialized(true);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const value: AuthContextType = {
    isInitialized,
    isAuthenticated: AuthService.isAuthenticated(),
    user,
    initialize,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};