import React from 'react';
import useSocialNetworks from '../../hooks/contact/UseSocialNetworks';

const Footer = () => {
    const { socialNetworks } = useSocialNetworks();

    return (
        <div className='w-full'>
            <div className='bg-secondary container flex flex-column justify-content-center gap-2'>
                <h2 className='text-center p-0 m-0'>Élevage du Bois de Morchene</h2>
                <span className='separator text-2xl'>Suivez-nous</span>
                <div className='flex flex-row justify-content-center gap-3'>
                    { socialNetworks?.map((sn, i) => (
                        <a href={sn.url} target='_blank' rel='noreferrer'>
                            <i key={i} className={`pi pi-${sn.label} bg-primary border-circle p-3 text-3xl`}></i>
                        </a>
                    ))}
                </div>
                <div className='flex flex-wrap flex-row justify-content-center gap-3 mt-2'>
                    <a href="/" className='font-bold text-lg'>Accueil</a>
                    <a href="/" className='font-bold text-lg'>chien1</a>
                    <a href="/" className='font-bold text-lg'>chien2</a>
                    <a href="/" className='font-bold text-lg'>chien3</a>
                    <a href="/" className='font-bold text-lg'>chien4</a>
                </div>
                <div className='flex flex-row justify-content-center gap-3 mt-4'>
                    <span className='text-sm'>Copyright © 2024 - Tout droit réservé</span>
                    <a href="/mentions-legales" className='text-sm'>Mentions Légales</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;