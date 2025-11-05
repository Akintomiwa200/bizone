import { useMemo } from 'react';
import { useAuth } from './useAuth';
import { AuthService } from '@/lib/auth/auth';

export interface Permission {
  resource: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'manage';
}

export interface UserRole {
  name: string;
  permissions: Permission[];
}

// Define roles and their permissions
export const ROLES: { [key: string]: UserRole } = {
  admin: {
    name: 'Administrator',
    permissions: [
      { resource: 'users', action: 'manage' },
      { resource: 'products', action: 'manage' },
      { resource: 'orders', action: 'manage' },
      { resource: 'deliveries', action: 'manage' },
      { resource: 'payments', action: 'manage' },
      { resource: 'analytics', action: 'manage' },
      { resource: 'settings', action: 'manage' },
      { resource: 'chat', action: 'manage' },
      { resource: 'whatsapp', action: 'manage' },
    ],
  },
  manager: {
    name: 'Manager',
    permissions: [
      { resource: 'products', action: 'manage' },
      { resource: 'orders', action: 'manage' },
      { resource: 'deliveries', action: 'manage' },
      { resource: 'payments', action: 'read' },
      { resource: 'analytics', action: 'read' },
      { resource: 'chat', action: 'manage' },
      { resource: 'whatsapp', action: 'manage' },
    ],
  },
  staff: {
    name: 'Staff',
    permissions: [
      { resource: 'products', action: 'read' },
      { resource: 'orders', action: 'read' },
      { resource: 'orders', action: 'update' },
      { resource: 'deliveries', action: 'read' },
      { resource: 'deliveries', action: 'update' },
      { resource: 'chat', action: 'read' },
      { resource: 'chat', action: 'create' },
      { resource: 'whatsapp', action: 'read' },
      { resource: 'whatsapp', action: 'create' },
    ],
  },
  customer: {
    name: 'Customer',
    permissions: [
      { resource: 'products', action: 'read' },
      { resource: 'orders', action: 'create' },
      { resource: 'orders', action: 'read' },
      { resource: 'chat', action: 'create' },
      { resource: 'chat', action: 'read' },
    ],
  },
};

export interface UsePermissionsReturn {
  hasPermission: (resource: string, action: string) => boolean;
  hasAnyPermission: (permissions: Array<{ resource: string; action: string }>) => boolean;
  hasAllPermissions: (permissions: Array<{ resource: string; action: string }>) => boolean;
  userRole: UserRole | null;
  allowedActions: (resource: string) => string[];
  canAccess: (resource: string) => boolean;
}

export const usePermissions = (): UsePermissionsReturn => {
  const { user } = useAuth();

  const userRole = useMemo(() => {
    if (!user) return null;
    
    const roleName = user.role || 'customer';
    return ROLES[roleName] || ROLES.customer;
  }, [user]);

  const hasPermission = useMemo(() => {
    return (resource: string, action: string): boolean => {
      if (!userRole) return false;

      return userRole.permissions.some(
        permission => 
          permission.resource === resource && 
          (permission.action === action || permission.action === 'manage')
      );
    };
  }, [userRole]);

  const hasAnyPermission = useMemo(() => {
    return (permissions: Array<{ resource: string; action: string }>): boolean => {
      return permissions.some(permission => 
        hasPermission(permission.resource, permission.action)
      );
    };
  }, [hasPermission]);

  const hasAllPermissions = useMemo(() => {
    return (permissions: Array<{ resource: string; action: string }>): boolean => {
      return permissions.every(permission => 
        hasPermission(permission.resource, permission.action)
      );
    };
  }, [hasPermission]);

  const allowedActions = useMemo(() => {
    return (resource: string): string[] => {
      if (!userRole) return [];

      const actions = userRole.permissions
        .filter(permission => 
          permission.resource === resource && permission.action !== 'manage'
        )
        .map(permission => permission.action);

      // If user has manage permission, they can do all actions
      if (userRole.permissions.some(p => p.resource === resource && p.action === 'manage')) {
        return ['create', 'read', 'update', 'delete', 'manage'];
      }

      return [...new Set(actions)]; // Remove duplicates
    };
  }, [userRole]);

  const canAccess = useMemo(() => {
    return (resource: string): boolean => {
      return hasPermission(resource, 'read') || 
             hasPermission(resource, 'create') || 
             hasPermission(resource, 'update') || 
             hasPermission(resource, 'delete') || 
             hasPermission(resource, 'manage');
    };
  }, [hasPermission]);

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    userRole,
    allowedActions,
    canAccess,
  };
};

// Hook for role-based component rendering
export const useRole = (allowedRoles: string[]): boolean => {
  const { user } = useAuth();

  return useMemo(() => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  }, [user, allowedRoles]);
};

// Hook for permission-based component rendering
export const usePermission = (resource: string, action: string): boolean => {
  const { hasPermission } = usePermissions();

  return hasPermission(resource, action);
};

// Hook for feature flags
export const useFeature = (feature: string): boolean => {
  const { user } = useAuth();

  return useMemo(() => {
    if (!user) return false;
    
    // Define feature flags based on user role or other criteria
    const featureFlags: { [key: string]: string[] } = {
      advanced_analytics: ['admin', 'manager'],
      bulk_operations: ['admin', 'manager'],
      export_data: ['admin', 'manager'],
      system_settings: ['admin'],
      user_management: ['admin'],
    };

    const allowedRoles = featureFlags[feature] || [];
    return allowedRoles.includes(user.role);
  }, [user, feature]);
};