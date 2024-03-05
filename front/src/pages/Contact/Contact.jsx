import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import useInfos from '../../hooks/contact/UseInfos';
import Map from './Map';

const Contact = () => {
    const { infos } = useInfos();

    return (
        <>
            <Header />
                <div className='container flex-grow-1'>
                    <div className='w-full h-full flex flex-column justify-content-center align-items-center'>
                        <div className='w-full shadow-4 p-5 border-round-xl flex flex-row'>
                            <div className='w-5'>
                                <h2 className='mt-0'>Nous contacter</h2>
                                <div className='flex flex-column gap-3 pt-3'>
                                    { infos?.email ? <span>{infos.email}</span> : null }
                                    { infos?.phone ? <span>{infos.phone}</span> : null }
                                    { infos?.address ? <span>{infos.address}</span> : null }
                                    { infos?.timetable ? <span>{infos.timetable}</span> : null }
                                </div>
                            </div>
                            <div className='flex justify-content-center px-2'>
                                <div className='border-2 border-gray-200 w-min h-full'></div>

                            </div>
                            <div className='flex-grow-1'>
                                <div className='w-full h-20rem'>
                                    { infos?.latitude && infos?.longitude ? <Map latitude={infos.latitude} longitude={infos.longitude}/> : null }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    )
}

export default Contact;