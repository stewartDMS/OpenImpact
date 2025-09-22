import React from 'react';
import CompanyDashboardPage from '../components/company/CompanyDashboardPage';
import { useRequireAuth } from '../hooks/useRequireAuth';

export default function CompanyDashboard() {
  const { isLoading } = useRequireAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading company dashboard...</p>
        </div>
      </div>
    );
  }

  return <CompanyDashboardPage />;
}