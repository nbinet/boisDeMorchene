import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Public/Home/Home';
import HomeAdmin from './pages/BackOffice/Home/Home';
import Contact from './pages/Public/Contact/Contact';
import ContactAdmin from './pages/BackOffice/Contact/Contact';
import Layout from './pages/Public/Layout';
import LayoutAdmin from './pages/BackOffice/Layout';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='contact' element={<Contact />} />
                    <Route path='*' element={<Home />} />
                </Route>
                <Route path='/admin' element={<LayoutAdmin />}>
                    <Route index element={<HomeAdmin />} />
                    <Route path='contact' element={<ContactAdmin />} />
                    <Route path='*' element={<HomeAdmin />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;