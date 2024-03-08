import React, { useRef } from 'react';
import useSocialNetworks from '../../hooks/contact/UseSocialNetworks';

const Header = () => {
    const checkboxMenu = useRef(null);

    const { socialNetworks } = useSocialNetworks();

    return (
        <div className='w-full p-3 bg-secondary grid justify-content-between align-items-center gap-3 m-0'>
            <div className='col-3'>
                <img src="assets/logo512.png" alt="logo" className='max-w-full max-h-7rem' />
            </div>
            <nav className='col flex justify-content-center'>
                <label>
                    <input type="checkbox" ref={checkboxMenu} />
                    <span className="menu">
                        <span className="burger"></span>
                    </span>
                    <ul className='px-4 py-2 border-round-max bg-primary w-min flex flex-column lg:flex-row gap-3'>
                        <li><a href="/" className='font-bold text-lg no-underline'>Accueil</a></li>
                        <li className='hidden lg:block'><div className='border-1 border-secondary h-full' /></li>
                        <li><a href="/" className='font-bold text-lg no-underline'>chien1</a></li>
                        <li className='hidden lg:block'><div className='border-1 border-secondary h-full' /></li>
                        <li><a href="/" className='font-bold text-lg no-underline'>chien2</a></li>
                        <li className='hidden lg:block'><div className='border-1 border-secondary h-full' /></li>
                        <li><a href="/" className='font-bold text-lg no-underline'>chien3</a></li>
                        <li className='hidden lg:block'><div className='border-1 border-secondary h-full' /></li>
                        <li><a href="/" className='font-bold text-lg no-underline'>chien4</a></li>
                        <li className='hidden lg:block'><div className='border-1 border-secondary h-full' /></li>
                        <li><a href="/contact" className='font-bold text-lg no-underline'>Contact</a></li>
                    </ul>
                </label>
            </nav>
            <div className='col-3 hidden lg:flex flex-row justify-content-end gap-3'>
                { socialNetworks?.map((sn, i) => (
                    <a href={sn.url} target='_blank' rel='noreferrer'>
                        <i key={i} className={`pi pi-${sn.label} bg-primary border-circle p-3 text-3xl`}></i>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Header;