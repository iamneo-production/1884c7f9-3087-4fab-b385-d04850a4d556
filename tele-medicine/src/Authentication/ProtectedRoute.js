// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthContext } from '../globalHandler/AuthProvider';


function ProtectedRoute({ allowedRoles, element }) {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/" />;
  }

  const userRole = user.role;

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <Route element={element} />;
}

export default ProtectedRoute;

