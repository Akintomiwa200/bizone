import { apiClient } from './client';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  message?: string;
}

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
  businessName?: string;
  role?: 'business_owner' | 'farmer' | 'buyer' | 'delivery' | 'rider' | 'admin';
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  businessName?: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  password: string;
}

interface BackendUser {
  _id: string;
  name?: string;
  email: string;
  phone?: string;
  role?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const splitName = (name = '') => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: '', lastName: '' };
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
};

const mapUser = (user: BackendUser): User => {
  const { firstName, lastName } = splitName(user.name || '');
  return {
    id: user._id,
    email: user.email,
    firstName,
    lastName,
    phone: user.phone || '',
    role: user.role || 'business_owner',
    isVerified: !!user.isVerified,
    createdAt: user.createdAt || new Date().toISOString(),
    updatedAt: user.updatedAt || new Date().toISOString(),
  };
};

export const authAPI = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<ApiEnvelope<{ user: BackendUser; token: string }>>('/auth/login', credentials);
    const token = response.data?.token || '';
    apiClient.setAuthToken(token);
    return {
      user: mapUser(response.data.user),
      token,
      refreshToken: '',
    };
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const payload = {
      name: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: data.role || 'business_owner',
    };

    const response = await apiClient.post<ApiEnvelope<{ user: BackendUser; token: string }>>('/auth/register', payload);
    const token = response.data?.token || '';
    apiClient.setAuthToken(token);

    return {
      user: mapUser(response.data.user),
      token,
      refreshToken: '',
    };
  },

  async logout(): Promise<void> {
    apiClient.removeAuthToken();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
    }
  },

  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    // Backend currently does not expose refresh token endpoint.
    if (!refreshToken) {
      throw new Error('Refresh token is required');
    }
    return { token: '' };
  },

  async forgotPassword(data: ForgotPasswordData): Promise<{ message: string }> {
    return { message: `Password reset flow is not enabled on backend for ${data.email}.` };
  },

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    return { message: `Password reset token ${data.token ? 'received' : 'missing'}. Backend endpoint is not enabled.` };
  },

  async verifyEmail(token: string): Promise<{ message: string }> {
    return { message: `Email verification token ${token ? 'received' : 'missing'}.` };
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiEnvelope<BackendUser>>('/auth/me');
    return mapUser(response.data);
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const payload: Record<string, unknown> = {
      ...(data.email ? { email: data.email } : {}),
      ...(data.phone ? { phone: data.phone } : {}),
      ...(data.role ? { role: data.role } : {}),
    };

    if (data.firstName || data.lastName) {
      payload.name = `${data.firstName || ''} ${data.lastName || ''}`.trim();
    }

    const response = await apiClient.put<ApiEnvelope<BackendUser>>('/auth/profile', payload);
    return mapUser(response.data);
  },
};
