import React from 'react';

const Home = () => {
    return (
        <div  className='relative-container'>
            <video autoPlay loop muted className='w-full video-height'>
                <source src="https://video.wixstatic.com/video/11062b_b07b4c36aacc42aa86ce4bd9b8d3afd3/720p/mp4/file.mp4" type="video/mp4" />
            </video>
            <div className='overlay text-center'>
                <h1 className='mb-5 font-light'>Notre élevage est situé dans le Calvados, en Normandie</h1>
                <a href='/contact' className='contact-link no-underline'>Nous contacter pour plus d'informations</a>
            </div>
        </div>
    )
}

export default Home;