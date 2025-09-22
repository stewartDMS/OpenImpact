import React from 'react';
import AuthPage from '../../components/Auth/AuthPage';

/**
 * Authentication page using custom auth components with Tailwind CSS
 * 
 * Provides comprehensive authentication flows including:
 * - Sign in with email/password and social providers
 * - Account type selection (individual/company/nonprofit)
 * - Company-specific signup form
 * - Success messages and redirects
 * 
 * Integrates with both NextAuth.js and custom AuthContext
 */
export default function NewAuth() {
  return <AuthPage />;
}