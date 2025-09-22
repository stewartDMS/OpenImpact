import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthState = () => {
      try {
        const savedUser = localStorage.getItem('openimpact_user');
        const savedAuth = localStorage.getItem('openimpact_auth');
        
        if (savedUser && savedAuth === 'true') {
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('openimpact_user');
        localStorage.removeItem('openimpact_auth');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from your API
      const userData = {
        id: '1',
        email: email,
        name: email.split('@')[0], // Use email prefix as name for demo
        accountType: 'individual',
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      localStorage.setItem('openimpact_user', JSON.stringify(userData));
      localStorage.setItem('openimpact_auth', 'true');
      
      setUser(userData);
      setIsAuthenticated(true);
      
      return userData;
    } catch (error) {
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - in real app, this would create account via API
      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        accountType: userData.accountType || 'individual',
        companyName: userData.companyName,
        industry: userData.industry,
        companySize: userData.companySize,
        jobTitle: userData.jobTitle,
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      localStorage.setItem('openimpact_user', JSON.stringify(newUser));
      localStorage.setItem('openimpact_auth', 'true');
      
      setUser(newUser);
      setIsAuthenticated(true);
      
      return newUser;
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('openimpact_user');
    localStorage.removeItem('openimpact_auth');
    
    // Reset state
    setUser(null);
    setIsAuthenticated(false);
    
    // Redirect to home page
    window.location.href = '/';
  };

  const updateUser = (updates) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    
    // Update localStorage
    localStorage.setItem('openimpact_user', JSON.stringify(updatedUser));
    
    // Update state
    setUser(updatedUser);
  };

  const forgotPassword = async (email) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would trigger password reset email
      console.log('Password reset email sent to:', email);
      
      return { success: true, message: 'Password reset email sent' };
    } catch (error) {
      throw new Error('Failed to send password reset email');
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token, newPassword) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would validate token and update password
      console.log('Password reset for token:', token);
      
      return { success: true, message: 'Password updated successfully' };
    } catch (error) {
      throw new Error('Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    // State
    isAuthenticated,
    user,
    isLoading,
    
    // Actions
    login,
    register,
    logout,
    updateUser,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;