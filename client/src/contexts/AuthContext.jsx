import React, { createContext, useState, useEffect, useContext } from 'react';

// Create AuthContext
export const AuthContext = createContext();

// Create a custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

// Create a provider component to manage the user state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
