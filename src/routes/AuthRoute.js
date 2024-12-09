import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Loader from './Loader';

const RedirectWithLoader = ({ countdown, redirectTo }) => {
    const [timer, setTimer] = useState(countdown);

    useEffect(() => {
        if (timer > 0) {
            const timerId = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [timer]);

    if (timer === 0) {
        return <Navigate to={redirectTo} replace />;
    }

    return (
        <div style={{ height: '100vh' }} className="d-flex flex-column align-items-center justify-content-center">
            <Loader />
        </div>
    );
};

const PrivateRoute = ({ children }) => {
    const token = Cookies.get('token');
    if (!token) {
        return <RedirectWithLoader countdown={5} redirectTo="/login" />;
    }
    return children;
};

const PublicRoute = ({ children }) => {
    const token = Cookies.get('token');
    const authData = Cookies.get('auth');

    let parsedAuthData;
    try {
        parsedAuthData = authData ? JSON.parse(authData) : null;
    } catch (error) {
        console.error('Error parsing authData:', error);
        return <RedirectWithLoader countdown={5} redirectTo="/login" />;
    }

    const role = parsedAuthData?.user?.role;

    if (token && role === 1) {
        return <RedirectWithLoader countdown={5} redirectTo="/dashboard/admin" />;
    }

    if (token && role === 0) {
        return <RedirectWithLoader countdown={5} redirectTo="/dashboard/user" />;
    }

    return children;
};

const AdminRoute = ({ children }) => {

    const token = Cookies.get('token');
    const authData = Cookies.get('auth');

    if (!token || !authData) {
        return <RedirectWithLoader countdown={5} redirectTo="/login" />;
    }

    const parsedAuthData = JSON.parse(authData);
    const role = parsedAuthData?.user?.role;

    if (role !== 1) {
        return <RedirectWithLoader countdown={5} redirectTo="/dashboard/user" />;
    }

    return children;
};

export { PrivateRoute, PublicRoute, AdminRoute };
