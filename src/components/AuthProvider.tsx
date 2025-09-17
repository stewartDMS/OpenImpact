import React, { useState, ReactNode, useEffect } from 'react';
import { AuthContext, User } from '../lib/auth';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('openimpact_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('openimpact_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (username: string) => {
    const userData = { username };
    setUser(userData);
    localStorage.setItem('openimpact_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('openimpact_user');
  };

  const isAuthenticated = user !== null;

  // Don't render children until we've loaded the initial auth state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};