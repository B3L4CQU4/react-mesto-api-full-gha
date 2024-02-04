import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLogined }) => {
  return isLogined ? children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute