import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
      return;
    }

    if (session?.user) {
      setUser({
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        // Add custom user properties here
        accountType: session.user.accountType || 'individual',
        companyId: session.user.companyId || null,
        permissions: session.user.permissions || [],
      });
    } else {
      setUser(null);
    }

    setLoading(false);
  }, [session, status]);

  const updateUser = (updates) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  const isAuthenticated = () => {
    return !!user && status === 'authenticated';
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  const isCompanyUser = () => {
    return user?.accountType === 'company';
  };

  const isIndividualUser = () => {
    return user?.accountType === 'individual';
  };

  const value = {
    user,
    loading,
    session,
    status,
    updateUser,
    isAuthenticated,
    hasPermission,
    isCompanyUser,
    isIndividualUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;