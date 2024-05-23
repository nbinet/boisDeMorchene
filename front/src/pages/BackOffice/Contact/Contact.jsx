import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import Infos from './Infos';

const Contact = () => {
    const breadcrumb = [
        { label: 'Administration', url: '/admin' },
        { label: 'Contact' },
    ]
    const home = { icon: 'pi pi-home', url: '/' }

    return (
        <div className='flex-grow-1 bg-primary container'>
            <BreadCrumb model={breadcrumb} home={home} className='mb-4' />
            <div className='flex flex-row'>
                <Infos />
            </div>
        </div>
    )
}

export default Contact;