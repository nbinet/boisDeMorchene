import { Message } from 'primereact/message';
import React from 'react';

const Litter = ({ litter }) => {
    return (
        <div className='bg-secondary py-4'>
            <h2 className='text-center text-white text-xl lg:text-5xl'>Nos portées</h2>
            { litter?.length ?
                <>
                    <swiper-container
                        breakpoints={
                            JSON.stringify({
                                640:{
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 2,
                                    spaceBetween: 50,
                                }
                            })
                        }
                        pagination="true"
                        navigation="true"
                    >
                        { litter.map((l, i) => (
                            <swiper-slide key={i}>Slide</swiper-slide>
                        )) }
                    </swiper-container>
                </>
            :
                <div className='flex justify-content-center'>
                    <Message severity='warn' text="Aucune portée n'est disponible" />
                </div>
            }
        </div>
    )
}

export default Litter;