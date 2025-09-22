import React from 'react';
import ModalContainer from './ModalContainer';

const PremiumModal = ({ isOpen, onClose }) => {
  const features = [
    { icon: '⚡', title: 'Advanced Analytics', description: 'Deep insights and custom reports' },
    { icon: '🚀', title: 'Priority Support', description: '24/7 dedicated customer support' },
    { icon: '📊', title: 'Custom Dashboards', description: 'Build personalized impact dashboards' },
    { icon: '🔗', title: 'API Access', description: 'Full API access for integrations' },
    { icon: '👥', title: 'Team Collaboration', description: 'Unlimited team members' },
    { icon: '🔒', title: 'Enhanced Security', description: 'Advanced security and compliance' },
  ];

  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} title="Upgrade to Premium" size="lg">
      <div className="space-y-6">
        {/* Hero section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Unlock the Full Power of Open Impact
          </h2>
          <p className="text-gray-600">
            Get access to advanced features and take your impact analysis to the next level
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl">{feature.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">$29/month</div>
          <p className="text-gray-600 mb-4">Everything you need to maximize your impact</p>
          <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Start Free Trial
          </button>
          <p className="text-xs text-gray-500 mt-2">14-day free trial • Cancel anytime</p>
        </div>

        {/* Footer */}
        <div className="text-center">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Maybe later
          </button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default PremiumModal;