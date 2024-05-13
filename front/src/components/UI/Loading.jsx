import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

const Loading = ({ text }) => {
    return (
        <div className='flex flex-column gap-3'>
            <ProgressSpinner />
            <span>{text ?? 'Chargement'}</span>
        </div>
    )
}

export default Loading;