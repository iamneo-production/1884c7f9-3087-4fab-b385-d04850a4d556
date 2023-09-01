import React from 'react';
import { useAuthContext } from '../globalHandler/AuthProvider';
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user context by calling the logout function
    logout();
    navigate('/')

  };

  return (
    <button className='btn btn-primary' onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
