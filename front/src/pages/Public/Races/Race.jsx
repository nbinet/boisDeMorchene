import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import useRace from '../../../hooks/races/useRace';
import Loading from '../../../components/UI/Loading';
import NotFound from '../../../components/UI/NotFound';
import { API_URL } from '../../../consts/api';
import Litter from './Litter';

const Race = () => {
    const { slug } = useParams();

    const { race, fetchRace, loading, error } = useRace();

    useEffect(() => {
        fetchRace(slug);
    }, [fetchRace, slug]);

    return (
        <div className='h-full'>
            { loading ? <Loading /> : <>
                { error ? <NotFound /> :
                    <>
                        <div className='flex flex-row'>
                            { race.image ?
                                <div className='col-12 lg:col-5 aspect-1 bg-secondary p-0'>
                                    <img src={`${API_URL}/${race.image}`} alt={race.label} className='w-full h-full fit-cover' />
                                </div>
                            : null }
                            <div className='col p-2 lg:p-5 text-white'>
                                <h2 className='tetx-xl lg:text-5xl'>{race.label}</h2>
                                { race.description ? <p className='white-space-prewrap'>{race.description}</p> : null }
                            </div>
                        </div>
                        <Litter />
                    </>
                }
            </> }
        </div>
    )
}

export default Race;