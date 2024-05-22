import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useDog from '../../../hooks/dogs/useDog';
import { API_URL } from '../../../consts/api';

const Dog = () => {
    const { id } = useParams();
    const { dog, fetchDog, loading, error } = useDog();

    useEffect(() => {
        fetchDog(id);
    }, [id, fetchDog]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading dog: {error.message}</div>;
    }

    return (
        <div className='h-full bg-white'>
            {dog ? (
                <div className='flex-row bg-white pt-5 bloc_race'>
                                    
                    { dog.image ?
                        <div className='col-12 lg:col-5 p-0'>
                            <img src={`${API_URL}/${dog.image}`} alt={dog.name} className='w-full h-full fit-cover' />
                        </div>
                    : null }
                                    
                    <div className='col p-2 lg:p-5'>
                        <h1 className='text-xl lg:text-5xl font-light style_h1'>{dog.name}</h1>
                        { dog.age ? <p className='white-space-prewrap'>{dog.age} an(s)</p> : null }
                        { dog.description ? <p className='white-space-prewrap'>{dog.description}</p> : null }
                    </div>
                </div>
            ) : (
                <div>Chien non trouvé</div>
            )}
        </div>
    );
};

export default Dog;