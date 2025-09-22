import React from 'react';
import Link from 'next/link';

const SuccessMessage = ({ accountType, companyData }) => {
  return (
    <div className="text-center space-y-6">
      <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to Open Impact!
        </h2>
        <p className="text-gray-600">
          {accountType === 'company' 
            ? `Your company account for ${companyData?.companyName} has been created successfully.`
            : 'Your individual account has been created successfully.'
          }
        </p>
      </div>

      {accountType === 'company' && companyData && (
        <div className="bg-gray-50 rounded-lg p-4 text-left max-w-md mx-auto">
          <h3 className="font-medium text-gray-900 mb-2">Account Details:</h3>
          <div className="space-y-1 text-sm text-gray-600">
            <p><span className="font-medium">Company:</span> {companyData.companyName}</p>
            <p><span className="font-medium">Industry:</span> {companyData.industry}</p>
            <p><span className="font-medium">Size:</span> {companyData.size}</p>
            <p><span className="font-medium">Contact:</span> {companyData.contactName}</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="text-sm text-gray-600">
          <p className="mb-2">Next steps:</p>
          <ul className="text-left max-w-md mx-auto space-y-1">
            <li>• Complete your profile setup</li>
            <li>• Explore the dashboard features</li>
            <li>• Connect your data sources</li>
            {accountType === 'company' && (
              <li>• Invite team members to collaborate</li>
            )}
          </ul>
        </div>

        <div className="space-x-4">
          <Link 
            href="/dashboard"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link 
            href="/profile"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md font-medium transition-colors"
          >
            Complete Profile
          </Link>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        <p>
          Need help getting started? 
          <a href="/help" className="text-primary-600 hover:text-primary-500 ml-1">
            Visit our help center
          </a>
        </p>
      </div>
    </div>
  );
};

export default SuccessMessage;