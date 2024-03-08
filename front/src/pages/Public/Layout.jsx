import React from 'react';
import Header from '../../components/Public/Header';
import { Outlet } from "react-router-dom";
import Footer from '../../components/Public/Footer';

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