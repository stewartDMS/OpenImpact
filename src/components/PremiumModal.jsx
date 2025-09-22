import React from 'react';
import ModalContainer from './ModalContainer';

const PremiumModal = ({ isOpen, onClose }) => {
  const features = [
    { name: 'Advanced Analytics', description: 'Deep insights into company performance' },
    { name: 'Custom Reports', description: 'Generate tailored impact reports' },
    { name: 'API Access', description: 'Integrate with your existing systems' },
    { name: 'Priority Support', description: '24/7 dedicated customer support' },
    { name: 'Data Export', description: 'Export data in multiple formats' },
    { name: 'Team Collaboration', description: 'Share insights with your team' },
  ];

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Upgrade to Premium"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Unlock Advanced Features
          </h2>
          <p className="text-gray-600">
            Get access to premium tools and insights to maximize your impact analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">{feature.name}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <div className="text-3xl font-bold text-gray-900">
            $29<span className="text-lg font-normal text-gray-600">/month</span>
          </div>
          <div className="space-x-4">
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Upgrade Now
            </button>
            <button 
              onClick={onClose}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default PremiumModal;