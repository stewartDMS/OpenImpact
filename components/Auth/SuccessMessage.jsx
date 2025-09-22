import React from 'react';

const SuccessMessage = ({ type = 'signup', email, onContinue }) => {
  const messages = {
    signup: {
      title: 'Account Created Successfully!',
      message: 'Welcome to Open Impact. Your account has been created and you can now start tracking your impact.',
      icon: '🎉',
      buttonText: 'Go to Dashboard'
    },
    login: {
      title: 'Welcome Back!',
      message: 'You have successfully signed in to your Open Impact account.',
      icon: '👋',
      buttonText: 'Go to Dashboard'
    },
    verification: {
      title: 'Check Your Email',
      message: `We&apos;ve sent a verification link to ${email}. Please check your email and click the link to verify your account.`,
      icon: '📧',
      buttonText: 'Continue'
    },
    passwordReset: {
      title: 'Password Reset Sent',
      message: `We&apos;ve sent password reset instructions to ${email}. Please check your email and follow the instructions.`,
      icon: '🔑',
      buttonText: 'Back to Sign In'
    }
  };

  const currentMessage = messages[type] || messages.signup;

  return (
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">{currentMessage.icon}</span>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {currentMessage.title}
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            {currentMessage.message}
          </p>
        </div>
      </div>

      {type === 'signup' && (
        <div className="bg-blue-50 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-blue-900">Next Steps:</h3>
          <ul className="text-sm text-blue-800 space-y-1 text-left">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Complete your profile setup
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Explore impact tracking tools
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Connect with the Open Impact community
            </li>
          </ul>
        </div>
      )}

      {type === 'verification' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-yellow-500 mr-2">⚠️</span>
            <p className="text-sm text-yellow-800">
              Didn&apos;t receive the email? Check your spam folder or{' '}
              <button className="underline hover:no-underline font-medium">
                resend verification email
              </button>
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <button
          onClick={onContinue}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {currentMessage.buttonText}
        </button>

        {type === 'verification' && (
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Skip for now
          </button>
        )}
      </div>

      {(type === 'signup' || type === 'login') && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Questions? Contact our support team at{' '}
            <a href="mailto:support@openimpact.org" className="text-blue-600 hover:text-blue-500">
              support@openimpact.org
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default SuccessMessage;