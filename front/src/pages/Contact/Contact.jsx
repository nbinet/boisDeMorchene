import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Contact = () => {
    return (
        <>
            <Header />
                <div className='container flex-grow-1'>
                    <div className='w-full h-full flex flex-column justify-content-center align-items-center'>
                        <div className='w-10 shadow-4 p-5 border-round-xl flex flex-row'>
                            <div className='w-4'>
                                <h2 className='mt-0'>Nous contacter</h2>
                                <div className='flex flex-column gap-3 pt-3'>
                                    <span>E-mail</span>
                                    <span>Téléphone</span>
                                    <span>Adresse</span>
                                </div>
                            </div>
                            <div className='flex justify-content-center px-2'>
                                <div className='border-2 border-gray-200 w-min h-full'></div>

                            </div>
                            <div className='flex-grow-1'>
                                <div className='w-full h-20rem'>
                                    <span>CARTE</span>
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