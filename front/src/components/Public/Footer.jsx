import React from 'react';
import useSocialNetworks from '../../hooks/contact/useSocialNetworks';
import useRaces from '../../hooks/races/useRaces';

const Footer = () => {
    const { socialNetworks } = useSocialNetworks();
    const { races } = useRaces();

    return (
        <div className='w-full'>
            <div className='bg-secondary container flex flex-column justify-content-center gap-2'>
                <h2 className='text-center p-0 m-0 font-light'>Élevage du Bois de Morchene</h2>
                <span className='separator text-2xl'>Rejoignez-nous</span>
                <div className='flex flex-row justify-content-center gap-3'>
                    { socialNetworks?.map((sn, i) => (
                        <a href={sn.url} target='_blank' rel='noreferrer'>
                            <i key={i} className={`pi pi-${sn.label} bg-primary border-circle p-3 text-3xl`}></i>
                        </a>
                    ))}
                </div>
                <div className='flex flex-wrap flex-row justify-content-center gap-3 mt-2'>
                <a href="/" className='text-lg'>Accueil</a>
                    { races?.map(r => <a key={r.id} href={`/races/${r.slug}`} className='text-lg'>{r.label}</a>) }
                    <a href="/contact" className='text-lg'>Contact</a>
                </div>
                <div className='flex flex-row justify-content-center gap-3 mt-4'>
                    <span className='text-sm'>Copyright © 2024 - Tout droit réservé</span>
                    <a href="/mentions-legales" className='text-sm'>Mentions Légales</a>
                    <a href="/admin" className='text-sm'>Administration</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;