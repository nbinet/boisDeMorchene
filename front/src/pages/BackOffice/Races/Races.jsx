import React from 'react';
import useRaces from '../../../hooks/races/UseRaces';

const Races = () => {
    const { races, loading } = useRaces();
    console.log(races);

    return (
        <div className='flex-grow-1 bg-primary container'>
            <h1>Races</h1>
        </div>
    )
}

export default Races;