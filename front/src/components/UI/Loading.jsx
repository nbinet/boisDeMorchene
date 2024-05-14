import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const Loading = ({ text }) => {
    return (
        <div className='flex flex-column justify-content-center align-items-center gap-3 h-full'>
            <ProgressSpinner />
            <span className='text-xl text-white'>{text ?? 'Chargement'}</span>
        </div>
    )
}

export default Loading;