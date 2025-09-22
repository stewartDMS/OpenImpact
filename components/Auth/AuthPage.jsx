import React, { useState } from 'react';
import Link from 'next/link';
import { useRedirectIfAuthenticated } from '../../hooks/useRequireAuth';
import AccountTypeForm from './AccountTypeForm';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import CompanySignUpForm from './CompanySignUpForm';
import SuccessMessage from './SuccessMessage';

const AuthPage = () => {
  const { isLoading } = useRedirectIfAuthenticated();
  const [currentStep, setCurrentStep] = useState('signin'); // signin, signup, account-type, company-signup, success
  const [selectedAccountType, setSelectedAccountType] = useState('individual');
  const [successType, setSuccessType] = useState('signup');
  const [userEmail, setUserEmail] = useState('');

  const handleAccountTypeSelect = (type) => {
    setSelectedAccountType(type);
    if (type === 'company') {
      setCurrentStep('company-signup');
    } else {
      setCurrentStep('signup');
    }
  };

  const handleSwitchToSignUp = () => {
    setCurrentStep('account-type');
  };

  const handleSwitchToSignIn = () => {
    setCurrentStep('signin');
  };

  const handleSignUpSuccess = (email) => {
    setUserEmail(email);
    setSuccessType('signup');
    setCurrentStep('success');
  };

  const handleSignInSuccess = () => {
    setSuccessType('login');
    setCurrentStep('success');
  };

  const handleForgotPassword = () => {
    // This would typically open a forgot password modal or redirect
    console.log('Forgot password clicked');
  };

  const handleContinue = () => {
    // Redirect will be handled by the auth context
    window.location.href = '/user-dashboard';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'signin':
        return (
          <SignInForm
            onSwitchToSignUp={handleSwitchToSignUp}
            onForgotPassword={handleForgotPassword}
            onSuccess={handleSignInSuccess}
          />
        );
      
      case 'account-type':
        return <AccountTypeForm onSelect={handleAccountTypeSelect} />;
      
      case 'signup':
        return (
          <SignUpForm
            onSwitchToSignIn={handleSwitchToSignIn}
            accountType={selectedAccountType}
            onSuccess={handleSignUpSuccess}
          />
        );
      
      case 'company-signup':
        return (
          <CompanySignUpForm
            onSwitchToSignIn={handleSwitchToSignIn}
            onSuccess={handleSignUpSuccess}
          />
        );
      
      case 'success':
        return (
          <SuccessMessage
            type={successType}
            email={userEmail}
            onContinue={handleContinue}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Open Impact</h1>
            <p className="mt-2 text-sm text-gray-600">
              Empowering social and environmental change
            </p>
          </div>

          {/* Auth Form */}
          {renderCurrentStep()}

          {/* Back to Home Link */}
          {currentStep !== 'success' && (
            <div className="mt-6 text-center">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;