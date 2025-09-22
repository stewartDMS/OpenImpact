import React from 'react';

const AccountTypeForm = ({ onSelect }) => {
  const accountTypes = [
    {
      type: 'individual',
      title: 'Individual',
      description: 'Personal account for impact tracking and analysis',
      icon: '👤',
      features: ['Personal dashboard', 'Basic analytics', 'Community access']
    },
    {
      type: 'company',
      title: 'Company',
      description: 'Business account for organizational impact management',
      icon: '🏢',
      features: ['Team collaboration', 'Advanced reporting', 'API access', 'Custom branding']
    },
    {
      type: 'nonprofit',
      title: 'Non-Profit',
      description: 'Special account for non-profit organizations',
      icon: '❤️',
      features: ['Donor reporting', 'Impact visualization', 'Grant tracking', 'Free premium features']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Account Type</h2>
        <p className="text-gray-600">Select the account type that best fits your needs</p>
      </div>

      <div className="grid gap-4">
        {accountTypes.map((account) => (
          <button
            key={account.type}
            onClick={() => onSelect(account.type)}
            className="text-left p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="flex items-start space-x-4">
              <span className="text-3xl">{account.icon}</span>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{account.title}</h3>
                <p className="text-gray-600 mb-3">{account.description}</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  {account.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AccountTypeForm;