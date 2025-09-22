import React from 'react';

const AccountTypeForm = ({ onSelect }) => {
  const accountTypes = [
    {
      type: 'individual',
      title: 'Individual',
      description: 'For investors, researchers, and individuals',
      icon: '👤',
      features: ['Personal dashboard', 'Basic analytics', 'Public data access']
    },
    {
      type: 'company',
      title: 'Company',
      description: 'For organizations and businesses',
      icon: '🏢',
      features: ['Company dashboard', 'Team collaboration', 'Advanced reporting']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Account Type</h2>
        <p className="text-gray-600">Select the type of account that best fits your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accountTypes.map((account) => (
          <div
            key={account.type}
            onClick={() => onSelect(account.type)}
            className="relative cursor-pointer rounded-lg border-2 border-gray-200 p-6 hover:border-primary-500 transition-colors"
          >
            <div className="text-center">
              <div className="text-4xl mb-4">{account.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{account.title}</h3>
              <p className="text-gray-600 mb-4">{account.description}</p>
              
              <ul className="text-sm text-gray-500 space-y-1">
                {account.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-4 h-4 text-primary-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <button className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
              Select {account.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountTypeForm;