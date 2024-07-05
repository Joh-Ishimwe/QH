import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ element: Component, ...rest }) => {
  const { isAdmin } = useAuth();

  return (
    <Route
      {...rest}
      element={isAdmin ? <Component /> : <Navigate to="/signin" />}
    />
  );
};

export default AdminRoute;
