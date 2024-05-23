import React from 'react';

const NotFound = () => {
    return (
        <div className='flex justify-content-center align-items-center h-full'>
            <div className='flex flex-column justify-content-center align-items-center gap-3 text-white bg-secondary p-4 border-round-xl'>
                <h2>La page que vous cherchez n'existe pas</h2>
                <a href='/' className='bg-primary border-primary p-button no-underline'>
                    <span>Retour à l'accueil</span>
                </a>
            </div>
        </div>
    )
}

export default NotFound;