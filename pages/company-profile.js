import React from 'react';
import { useRouter } from 'next/router';
import CompanyProfilePage from '../components/company/CompanyProfilePage';
import { useRequireAuth } from '../hooks/useRequireAuth';

export default function CompanyProfile() {
  const { isLoading } = useRequireAuth();
  const router = useRouter();
  const { companyId } = router.query;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading company profile...</p>
        </div>
      </div>
    );
  }

  // You could fetch company data here based on companyId
  // For now, we'll let the component handle its own data

  return <CompanyProfilePage companyId={companyId} />;
}