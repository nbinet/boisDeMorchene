import React from 'react';
import useInfos from '../../../hooks/contact/useInfos';
import Map from './Map';
import useSocialNetworks from '../../../hooks/contact/useSocialNetworks';

const Contact = () => {
    const { infos } = useInfos();
    const { socialNetworks } = useSocialNetworks();

    return (
        <>
            <div className='flex-grow-1 contact'>
                <div className='w-full h-full flex flex-column-reverse lg:flex-row'>
                    <div className='w-full lg:w-7 h-15rem sm:h-20rem lg:h-auto'>
                        { infos?.latitude && infos?.longitude ? <Map latitude={infos.latitude} longitude={infos.longitude}/> : null }
                    </div>
                    <div className='w-full lg:w-5 bg-contact p-3 md:p-5 lg:pr-2 flex flex-row justify-content-between'>
                        <div className='flex flex-column justify-content-around gap-3 w-full'>
                            <h2 className='m-0 uppercase text-4xl text-center lg:text-left'>Nous contacter</h2>
                            <div className='flex flex-column gap-3 lg:gap-5'>
                                { infos?.email ?
                                    <div className='flex flex-row gap-1 md:gap-3 align-items-center'>
                                        <i className='pi pi-at bg-primary border-circle p-2 text-sm sm:text-xl text-light'></i>
                                        <span className='font-bold word-break-all'>{infos.email}</span>
                                    </div>
                                : null }
                                { infos?.phone ?
                                    <div className='flex flex-row gap-1 md:gap-3 align-items-center'>
                                        <i className='pi pi-phone bg-primary border-circle p-2 text-sm sm:text-xl text-light'></i>
                                        <span className='font-bold'>{infos.phone}</span>
                                    </div>
                                : null }
                                { infos?.address ?
                                    <div className='flex flex-row gap-1 md:gap-3 align-items-center'>
                                        <i className='pi pi-map-marker bg-primary border-circle p-2 text-sm sm:text-xl text-light'></i>
                                        <span className='font-bold'>{infos.address}</span>
                                    </div>
                                : null }
                                { infos?.timetable ?
                                    <div className='flex flex-row gap-1 md:gap-3 align-items-center'>
                                        <i className='pi pi-calendar bg-primary border-circle p-2 text-sm sm:text-xl text-light'></i>
                                        <span className='font-bold'>{infos.timetable}</span>
                                    </div>
                                : null }
                            </div>
                            <div className='flex flex-row justify-content-center lg:justify-content-start gap-3'>
                                { socialNetworks?.map((sn, i) => (
                                    <a href={sn.url} target='_blank' rel='noreferrer'>
                                        <i key={i} className={`pi pi-${sn.label} bg-primary border-circle p-3 text-3xl`}></i>
                                    </a>

                                ))}
                            </div>
                        </div>
                        <span className='uppercase align-self-center text-vertical big-text hidden lg:block'>Contact</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;