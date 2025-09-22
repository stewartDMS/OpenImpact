import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
}

/**
 * Custom hook that redirects to login if user is not authenticated
 * @param {string} redirectTo - Where to redirect after successful login (default: current page)
 * @returns {AuthState} - Auth state and user data
 */
export const useRequireAuth = (redirectTo?: string): AuthState => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while still loading
    if (isLoading) return;

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      const currentPath = redirectTo || router.asPath;
      const loginUrl = `/auth?redirect=${encodeURIComponent(currentPath)}`;
      router.push(loginUrl);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return {
    isAuthenticated,
    user,
    isLoading
  };
};

/**
 * Custom hook that redirects authenticated users away from auth pages
 * @param {string} redirectTo - Where to redirect authenticated users (default: /dashboard)
 * @returns {AuthState} - Auth state and user data
 */
export const useRedirectIfAuthenticated = (redirectTo: string = '/dashboard'): AuthState => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while still loading
    if (isLoading) return;

    // If authenticated, redirect away from auth pages
    if (isAuthenticated) {
      const urlRedirect = router.query.redirect as string;
      const destination = urlRedirect ? decodeURIComponent(urlRedirect) : redirectTo;
      router.push(destination);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return {
    isAuthenticated,
    user,
    isLoading
  };
};

/**
 * Custom hook that checks if user has required account type
 * @param {string|array} requiredTypes - Required account type(s)
 * @param {string} redirectTo - Where to redirect if access denied
 * @returns {AuthState & {hasAccess: boolean}} - Auth state, user data, and access status
 */
export const useRequireAccountType = (
  requiredTypes: string | string[], 
  redirectTo: string = '/dashboard'
): AuthState & { hasAccess: boolean } => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  const hasAccess = user && (
    Array.isArray(requiredTypes) 
      ? requiredTypes.includes(user.accountType)
      : user.accountType === requiredTypes
  );

  useEffect(() => {
    // Don't redirect while still loading
    if (isLoading) return;

    // First check if authenticated
    if (!isAuthenticated) {
      const currentPath = router.asPath;
      const loginUrl = `/auth?redirect=${encodeURIComponent(currentPath)}`;
      router.push(loginUrl);
      return;
    }

    // Then check account type access
    if (isAuthenticated && !hasAccess) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, hasAccess, isLoading, router, redirectTo]);

  return {
    isAuthenticated,
    user,
    isLoading,
    hasAccess: !!hasAccess
  };
};

export default useRequireAuth;