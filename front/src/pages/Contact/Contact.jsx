import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useInfos from '../../hooks/contact/UseInfos';
import Map from './Map';
import useSocialNetworks from '../../hooks/contact/UseSocialNetworks';

const Contact = () => {
    const { infos } = useInfos();
    const { socialNetworks } = useSocialNetworks();
    console.log(socialNetworks);

    return (
        <>
            <Header />
                <div className='flex-grow-1 contact'>
                    <div className='w-full h-full flex flex-row'>
                        <div className='w-7'>
                            { infos?.latitude && infos?.longitude ? <Map latitude={infos.latitude} longitude={infos.longitude}/> : null }
                        </div>
                        <div className='w-5 bg-secondary p-5 flex flex-row justify-content-between'>
                            <div className='flex flex-column justify-content-around'>
                                <h2 className='m-0 uppercase text-4xl'>Nous contacter</h2>
                                <div className='flex flex-column gap-5'>
                                    { infos?.email ?
                                        <div className='flex flex-row gap-3 align-items-center'>
                                            <i className='pi pi-at bg-primary border-circle p-2 text-xl text-light'></i>
                                            <span className='font-bold'>{infos.email}</span>
                                        </div>
                                    : null }
                                    { infos?.phone ?
                                        <div className='flex flex-row gap-3 align-items-center'>
                                            <i className='pi pi-phone bg-primary border-circle p-2 text-xl text-light'></i>
                                            <span className='font-bold'>{infos.phone}</span>
                                        </div>
                                    : null }
                                    { infos?.address ?
                                        <div className='flex flex-row gap-3 align-items-center'>
                                            <i className='pi pi-map-marker bg-primary border-circle p-2 text-xl text-light'></i>
                                            <span className='font-bold'>{infos.address}</span>
                                        </div>
                                    : null }
                                    { infos?.timetable ?
                                        <div className='flex flex-row gap-3 align-items-center'>
                                            <i className='pi pi-calendar bg-primary border-circle p-2 text-xl text-light'></i>
                                            <span className='font-bold'>{infos.timetable}</span>
                                        </div>
                                    : null }
                                </div>
                                <div className='flex flex-row gap-3'>
                                    { socialNetworks?.map((sn, i) => (
                                        <a href={sn.url} target='_blank' rel='noreferrer'>
                                            <i key={i} className={`pi pi-${sn.label} bg-primary border-circle p-3 text-3xl`}></i>
                                        </a>

                                    ))}
                                </div>
                            </div>
                            <span className='uppercase align-self-center text-vertical big-text'>Contact</span>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    )
}

export default Contact;