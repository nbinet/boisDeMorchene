import React from 'react';
import { Menubar } from 'primereact/menubar';

const Header = () => {
    const menu = [
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            url: '/admin/contact',
        },
        {
            label: 'Réseaux sociaux',
            icon: 'pi pi-megaphone',
            url: '/admin/reseaux-sociaux',
        }
    ]
    return (
        <div className='w-full p-3 bg-primary'>
            <h1>Header</h1>
            <Menubar model={menu}/>
        </div>
    )
}

export default Header;