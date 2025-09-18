// src/components/ProtectedRoute.js
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // Show a loading indicator while checking auth state
    return <div>Loading...</div>;
  }

  if (!user) {
    // If user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the child components
  return children;
};

export default ProtectedRoute;