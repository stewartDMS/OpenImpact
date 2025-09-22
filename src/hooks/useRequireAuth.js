import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

/**
 * Custom hook to protect routes that require authentication
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.redirectTo - Path to redirect to if not authenticated (default: '/auth')
 * @param {string} options.accountType - Required account type ('individual', 'company', or null for any)
 * @param {boolean} options.loading - Show loading state while checking auth
 * @returns {Object} Auth state and user info
 */
export const useRequireAuth = (options = {}) => {
  const {
    redirectTo = '/auth',
    accountType = null,
    loading: showLoading = true
  } = options;

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Don't redirect while loading
    if (status === 'loading') return;

    // If not authenticated, redirect to auth page
    if (status === 'unauthenticated') {
      router.push(redirectTo);
      return;
    }

    // If specific account type is required, check it
    if (accountType && session?.user) {
      const userAccountType = session.user.accountType || 'individual';
      if (userAccountType !== accountType) {
        // Redirect to appropriate dashboard based on user's actual account type
        const targetPath = userAccountType === 'company' 
          ? '/company-dashboard' 
          : '/dashboard';
        router.push(targetPath);
        return;
      }
    }
  }, [session, status, router, redirectTo, accountType]);

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  const user = session?.user || null;

  // Return loading state if requested and still loading
  if (showLoading && isLoading) {
    return {
      loading: true,
      authenticated: false,
      user: null,
      session: null
    };
  }

  // Return null/redirect if not authenticated (component should handle this)
  if (!isAuthenticated) {
    return {
      loading: false,
      authenticated: false,
      user: null,
      session: null
    };
  }

  return {
    loading: false,
    authenticated: true,
    user,
    session
  };
};

/**
 * Higher-order component to wrap components that require authentication
 * 
 * @param {React.Component} WrappedComponent - Component to protect
 * @param {Object} options - Same options as useRequireAuth
 * @returns {React.Component} Protected component
 */
export const withRequireAuth = (WrappedComponent, options = {}) => {
  return function ProtectedComponent(props) {
    const auth = useRequireAuth(options);

    // Show loading spinner while checking authentication
    if (auth.loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
        </div>
      );
    }

    // Don't render anything if not authenticated (redirect is handled by hook)
    if (!auth.authenticated) {
      return null;
    }

    // Render the wrapped component with auth data
    return <WrappedComponent {...props} auth={auth} />;
  };
};

export default useRequireAuth;