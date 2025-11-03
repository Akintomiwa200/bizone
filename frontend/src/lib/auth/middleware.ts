import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from './auth';

export function authMiddleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password', '/auth/reset-password'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // API routes
  const isApiRoute = pathname.startsWith('/api');

  // Check if route requires authentication
  if (!isPublicRoute && !isApiRoute) {
    if (!token || !AuthService.isAuthenticated()) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (isPublicRoute && token && AuthService.isAuthenticated()) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export function apiAuthMiddleware(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  
  if (!token || !AuthService.isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

// Role-based access control
export function requireRole(role: string) {
  return (request: NextRequest) => {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token || !AuthService.isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userRole = AuthService.getUserRole();
    if (userRole !== role) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.next();
  };
}

export function requireAnyRole(roles: string[]) {
  return (request: NextRequest) => {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token || !AuthService.isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userRole = AuthService.getUserRole();
    if (!userRole || !roles.includes(userRole)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.next();
  };
}