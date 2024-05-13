import React, { useRef } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import useAllSocialNetworks from '../../../hooks/contact/UseAllSocialNetworks';
import useSocialNetworks from '../../../hooks/contact/UseSocialNetworks';
import { Button } from 'primereact/button';
import { capitalize } from '../../../utils/formatter';
import { deleteSocialNetwork } from '../../../services/backOffice/contact';
import { Toast } from 'primereact/toast';

const SocialNetworks = () => {
    const toast = useRef();

    const { allSocialNetworks } = useAllSocialNetworks();
    const { socialNetworks, setSocialNetworks, loading } = useSocialNetworks();

    const breadcrumb = [
        { label: 'Administration', url: '/admin' },
        { label: 'Réseaux sociaux' },
    ]
    const home = { icon: 'pi pi-home', url: '/' }

    const onDelete = async label => {
        const { deleted, error } = await deleteSocialNetwork(label);
        if (error) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: error, life: 6000 });
            return;
        }
        
        if (!deleted) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: "Il y a eu une erreur lors de la suppression du réseau social", life: 6000 });
            return;
        }

        toast.current.show({ severity: 'success', summary: 'Succès', detail: "Le réseau social a été supprimé", life: 6000 });

        const toDelete = socialNetworks.findIndex(sn => sn.label === label);
        const _socialNetworks = [...socialNetworks];
        if (toDelete !== -1)
            delete _socialNetworks[toDelete];
        setSocialNetworks(_socialNetworks);
    }

    return (
        <>
            <Toast ref={toast} />
            <div className='flex-grow-1 bg-primary container'>
                <BreadCrumb model={breadcrumb} home={home} className='mb-4' />
                <div className='flex flex-column'>
                    <div className='flex flex-row align-items-center gap-4'>
                        <h2>Vos réseaux sociaux</h2>
                        <Button icon="pi pi-plus" label="Ajouter un réseau" className='bg-secondary border-secondary hover-secondary' onClick={() => null} />
                    </div>
                    { loading ? null : (
                        socialNetworks?.length ?
                            <div className='flex flex-column gap-3'>
                                { socialNetworks.map((sn, i) => (
                                    <div key={i} className='flex flex-row align-items-center gap-2 p-3 border-round-xl bg-secondary hover-secondary'>
                                        <i className={`pi pi-${sn.label}`}></i>
                                        <span>{capitalize(sn.label)}</span>
                                        <Button icon="pi pi-trash" className='ml-auto' severity='danger' onClick={() => onDelete(sn.label)} />
                                    </div>
                                )) }
                            </div>
                        : <span>Vous n'avez ajouté aucun réseau social</span>
                    ) }
                </div>
            </div>
        </>
    )
}

export default SocialNetworks;