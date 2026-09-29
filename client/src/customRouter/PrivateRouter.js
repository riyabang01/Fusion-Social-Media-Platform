import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRouter = () => {
    const { auth } = useSelector(state => state);
    const [checking, setChecking] = useState(true);
    const firstLogin = localStorage.getItem('firstLogin');

    useEffect(() => {
        const timer = setTimeout(() => {
            setChecking(false);
        }, 400); 
        return () => clearTimeout(timer);
    }, [auth.token]);

    if (!firstLogin) {
        return <Navigate to="/" replace />;
    }

    if (checking && !auth.token) {
        return (
            <div className="d-flex justify-content-center align-items-center w-100 py-5" style={{ minHeight: "80vh" }}>
                <div className="text-secondary fw-semibold">Authenticating session...</div>
            </div>
        );
    }

    return auth.token ? <Outlet /> : <Navigate to="/" replace />;
}

export default PrivateRouter;
