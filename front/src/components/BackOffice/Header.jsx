import React from 'react';
import { Menubar } from 'primereact/menubar';

const Header = () => {
    const menu = [
        {
            label: 'contact',
            icon: 'pi pi-envelope',
            url: '/admin/contact',
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