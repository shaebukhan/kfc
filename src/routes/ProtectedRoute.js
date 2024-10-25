// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element }) => {
    const token = Cookies.get('protectverify'); // Get the token from cookies

    return token ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
