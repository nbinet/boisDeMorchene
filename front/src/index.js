import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeflex/primeflex.min.css'
// import 'primeicons/primeicons.css';
import './styles/app.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);
