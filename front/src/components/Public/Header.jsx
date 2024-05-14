import React, { useRef } from 'react';
import useSocialNetworks from '../../hooks/contact/useSocialNetworks';
import useRaces from '../../hooks/races/useRaces';

const Header = () => {
    const checkboxMenu = useRef(null);

    const { socialNetworks } = useSocialNetworks();

    const { races } = useRaces();

    return (
        <div className='w-full p-3 bg-white grid justify-content-between align-items-center gap-3 m-0'>
            <div>
            <a href="/"><img src="assets/logo.png" alt="logo" className='max-w-full max-h-7rem' /></a>
            </div>
            <nav className='col flex justify-content-end mr-6'>
                <label>
                    <input type="checkbox" ref={checkboxMenu} />
                    <span className="menu">
                        <span className="burger"></span>
                    </span>
                    <ul className='flex flex-column lg:flex-row gap-5'>
                        { races?.map(r => <li key={r.id}><a href={`/race/${r.slug}`} className='text-2xl no-underline'>{r.label}</a></li>)}
                        <li><a href="/contact" className='text-2xl no-underline'>Contact</a></li>
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