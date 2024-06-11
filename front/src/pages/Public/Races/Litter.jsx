// Litter.jsx
import { Message } from 'primereact/message';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../consts/api';

const Litter = ({ raceId }) => {
    const [litter, setLitter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLitter = async () => {
            try {
                const response = await fetch(`${API_URL}/dogs/race/${raceId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLitter(data.dogs); // Assurez-vous que la réponse contient une clé `dogs`
            } catch (error) {
                setError(error);
                console.error('Error fetching litter:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLitter();
    }, [raceId]);

    return (
        <div className='litter pt-4 pb-6'>
            <h2 className='text-center text-white text-xl lg:text-5xl font-light mt-0'>Nos portées</h2>
            { loading ? <div>Loading...</div> :
                error ? <div>Error loading litter: {error.message}</div> :
                litter.length ?
                    <swiper-container
                        breakpoints={JSON.stringify({
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 50,
                            }
                        })}
                        pagination="true"
                        navigation="true"
                    >
                        { litter.map((dog, i) => (
                            <swiper-slide key={i}>
                                <div className='text-center mb-8'>
                                    <Link to={`/chiens/${dog.id}`}>
                                        <img src={`${API_URL}/${dog.image}`} className='w-300 h-200' alt={dog.name} />
                                        <h3>{dog.name}</h3>
                                        <p>Age: {dog.age} an(s)</p>
                                    </Link>
                                </div>
                            </swiper-slide>
                        )) }
                    </swiper-container>
                :
                <div className='flex justify-content-center'>
                    <Message severity='warn' text="Aucune portée n'est disponible" />
                </div>
            }
        </div>
    );
};

export default Litter;