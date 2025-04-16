import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await authService.getProfile();
          setUser(response.data);
          setIsLoggedIn(true);
        } catch (err) {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const profileResponse = await authService.getProfile();
      setUser(profileResponse.data);
      setIsLoggedIn(true);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}; 