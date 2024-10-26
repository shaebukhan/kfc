import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Loader from './Loader';

// Protects routes from unauthorized access (checks if logged in)
const PrivateRoute = ({ children }) => {
    const token = Cookies.get('token'); // Check if token exists

    if (!token) {
        return <Navigate to="/login" />; // If no token, redirect to login
    }

    return children; // If logged in, allow access
};

// Blocks access to login and register pages if already logged in (admin-only)
const PublicRoute = ({ children }) => {
    const token = Cookies.get('token'); // Check if token exists

    if (token) {
        return <Navigate to="/dashboard/admin" />; // If logged in, redirect to dashboard
    }

    return children; // If not logged in, allow access to public pages (login/register)
};

// AdminRoute: If not logged in, show countdown and redirect to login
const AdminRoute = ({ children }) => {
    const token = Cookies.get('token'); // Get authentication token
    const [countdown, setCountdown] = useState(5); // Countdown state

    useEffect(() => {
        if (!token && countdown > 0) {
            const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000); // Countdown logic
            return () => clearTimeout(timer); // Cleanup timer
        }
    }, [countdown, token]);

    if (!token) {
        // Show loader and countdown when not logged in, redirect to login after countdown
        return (
            <div style={{ height: "100vh" }} className="d-flex flex-column align-items-center justify-content-center">
                <Loader />
                <h2>Not Access !</h2>
                <h2>Redirecting to login in {countdown} seconds...</h2>
                {countdown === 0 && <Navigate to="/login" />} {/* Redirect after countdown */}
            </div>
        );
    }

    return children; // If logged in, allow access
};

export { PrivateRoute, PublicRoute, AdminRoute };
