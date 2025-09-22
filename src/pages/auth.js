import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SignInForm from '../components/Auth/SignInForm';
import SignUpForm from '../components/Auth/SignUpForm';
import AccountTypeForm from '../components/Auth/AccountTypeForm';
import CompanySignUpForm from '../components/Auth/CompanySignUpForm';
import SuccessMessage from '../components/Auth/SuccessMessage';

export default function Auth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState('signin');
  const [accountType, setAccountType] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (session) {
      const userAccountType = session.user?.accountType || 'individual';
      const dashboardPath = userAccountType === 'company' 
        ? '/company-dashboard' 
        : '/dashboard';
      router.push(dashboardPath);
    }
  }, [session, router]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Don't render if already authenticated (will redirect)
  if (session) {
    return null;
  }

  const handleAccountTypeSelect = (type) => {
    setAccountType(type);
    if (type === 'individual') {
      setCurrentStep('signup');
    } else {
      setCurrentStep('company-signup');
    }
  };

  const handleCompanySignUpSuccess = (data) => {
    setCompanyData(data);
    setCurrentStep('success');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'signin':
        return (
          <SignInForm 
            onSwitchToSignUp={() => setCurrentStep('account-type')}
          />
        );
      case 'account-type':
        return (
          <AccountTypeForm 
            onSelect={handleAccountTypeSelect}
          />
        );
      case 'signup':
        return (
          <SignUpForm 
            onSwitchToSignIn={() => setCurrentStep('signin')}
          />
        );
      case 'company-signup':
        return (
          <CompanySignUpForm 
            onSuccess={handleCompanySignUpSuccess}
            onBack={() => setCurrentStep('account-type')}
          />
        );
      case 'success':
        return (
          <SuccessMessage 
            accountType={accountType}
            companyData={companyData}
          />
        );
      default:
        return <SignInForm onSwitchToSignUp={() => setCurrentStep('account-type')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-xl p-8">
          {renderCurrentStep()}
        </div>
        
        {/* Back to home link */}
        <div className="text-center mt-6">
          <Link 
            href="/" 
            className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}