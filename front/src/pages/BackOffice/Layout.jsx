import React from 'react';
import Header from '../../components/BackOffice/Header';
import { Outlet } from "react-router-dom";
import Footer from '../../components/BackOffice/Footer';

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout;