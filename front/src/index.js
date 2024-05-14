import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import { register } from 'swiper/element/bundle';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeflex/primeflex.min.css'
import 'primeicons/primeicons.css';
import './styles/app.css';
import './styles/text.css';
import './styles/border.css';
import './styles/burgerMenu.css';
import './styles/utils.css';
import './styles/pages/contact.css';

register();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);
