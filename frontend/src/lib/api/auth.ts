import { apiClient } from './client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  businessName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  businessName: string;
  role: 'admin' | 'user';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

export const authAPI = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    apiClient.setAuthToken(response.token);
    return response;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', data);
    apiClient.setAuthToken(response.token);
    return response;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
    apiClient.removeAuthToken();
  },

  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    const response = await apiClient.post<{ token: string }>('/auth/refresh', { refreshToken });
    apiClient.setAuthToken(response.token);
    return response;
  },

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    return await apiClient.post('/auth/forgot-password', data);
  },

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    return await apiClient.post('/auth/reset-password', data);
  },

  async verifyEmail(token: string): Promise<{ message: string }> {
    return await apiClient.post('/auth/verify-email', { token });
  },

  async getCurrentUser(): Promise<User> {
    return await apiClient.get<User>('/auth/me');
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    return await apiClient.patch<User>('/auth/profile', data);
  },
};