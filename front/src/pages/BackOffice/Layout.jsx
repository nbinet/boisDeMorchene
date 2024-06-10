import React from 'react';
import Header from '../../components/BackOffice/Header';
import { Navigate, Outlet } from "react-router-dom";
import { useAtomValue } from 'jotai';
import { tokenAtom } from '../../atoms/authAtom';

const Layout = () => {
    const token = useAtomValue(tokenAtom);

    if (!token) {
        return <Navigate to="/connexion" replace />;
    }

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Layout;