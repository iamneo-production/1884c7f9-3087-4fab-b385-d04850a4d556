import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  // State to hold the authenticated user
  const [user, setUser] = useState(null);

  // Check if the user is authenticated
  const isAuthenticated = () => !!user;

  // Log out the user
  const logout = () => {
    setUser(null);
    // You might want to perform additional cleanup or API requests here
  };

  // Create the context value
  const contextValue = {
    user,
    setUser,
    isAuthenticated,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
