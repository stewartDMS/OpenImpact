import React from 'react';
import { useRequireAuth } from '../hooks/useRequireAuth';
import UserDashboardPage from '../components/dashboard/UserDashboardPage';

export default function Dashboard() {
  const auth = useRequireAuth({
    accountType: 'individual', // Only individual users can access this dashboard
    redirectTo: '/auth'
  });

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

  return <UserDashboardPage />;
}