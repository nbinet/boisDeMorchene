import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useAtom } from 'jotai';
import { tokenAtom } from '../../atoms/authAtom';

const Header = () => {
    const setToken = useAtom(tokenAtom)[1];

    const logout = () => {
        setToken(undefined);
        window.location.href = '/';
    }

    const menu = [
        {
            label: 'Races',
            icon: 'pi pi-list',
            url: '/admin/races',
        },
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
        <div className='w-full p-3 bg-white'>
            <div className='flex flex-row justify-content-between align-items-center'>
                <a href="/"><img src="/assets/logo.png" alt="logo" className='max-w-full max-h-7rem' /></a>
                <Button label='Déconnexion' onClick={logout} className='bg-secondary border-secondary hover-secondary'/>
            </div>
            <Menubar model={menu}/>
        </div>
    )
}

export default Header;