import React, { useRef } from 'react';
import useSocialNetworks from '../../../hooks/contact/useSocialNetworks';
import { Button } from 'primereact/button';
import { capitalize } from '../../../utils/formatter';
import { deleteSocialNetwork } from '../../../services/backOffice/contact';
import { Toast } from 'primereact/toast';
import { selectedSocialNetworkAtom } from '../../../atoms/contactAtoms';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import Form from './Form';
import { useAtom, useAtomValue } from 'jotai';
import { tokenAtom } from '../../../atoms/authAtom';

const SocialNetworks = () => {
    const toast = useRef();

    const { socialNetworks, setSocialNetworks, loading } = useSocialNetworks();

    const setSelectedSocialNetwork = useAtom(selectedSocialNetworkAtom)[1];
    const token = useAtomValue(tokenAtom);

    const openForm = socialNetwork => {
        setSelectedSocialNetwork({
            id: socialNetwork?.id ?? undefined,
            label: socialNetwork?.label ?? '',
            url: socialNetwork?.url ?? '',
        });
    }

    const onDelete = id => {
        confirmDialog({
            message: `Êtes-vous sûr de vouloir supprimer ce réseau social ?`,
            header: 'Attention',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: () => acceptDelete(id),
            acceptLabel: "Oui",
            rejectLabel: "Annuler"
        });
    }

    const acceptDelete = async id => {
        const { deleted, error } = await deleteSocialNetwork(id, token);
        if (error) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: error, life: 6000 });
            return;
        }
        
        if (!deleted) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: "Il y a eu une erreur lors de la suppression du réseau social", life: 6000 });
            return;
        }

        toast.current.show({ severity: 'success', summary: 'Succès', detail: "Le réseau social a été supprimé", life: 6000 });

        const toDelete = socialNetworks.findIndex(sn => sn.id === id);
        const _socialNetworks = [...socialNetworks];
        if (toDelete !== -1)
            delete _socialNetworks[toDelete];
        setSocialNetworks(_socialNetworks);
    }

    return (
        <>
            <ConfirmDialog />
            <Form />
            <Toast ref={toast} />
            <div className='flex-grow-1 bg-primary container'>
                <div className='flex flex-column'>
                    <div className='flex flex-row align-items-center gap-4'>
                        <h2>Vos réseaux sociaux</h2>
                        <Button icon="pi pi-plus" label="Ajouter un réseau" className='bg-secondary border-secondary hover-secondary' onClick={() => openForm()} />
                    </div>
                    { loading ? null : (
                        socialNetworks?.length ?
                            <div className='flex flex-column gap-3'>
                                { socialNetworks.map((sn, i) => (
                                    <div key={i} className='flex flex-row align-items-center gap-2 p-3 border-round-xl bg-white text-primary'>
                                        <i className={`pi pi-${sn.label}`}></i>
                                        <span>{capitalize(sn.label)}</span>
                                        <div className='flex flex-row gap-3 ml-auto'>
                                            <Button className='bg-secondary border-secondary hover-secondary' icon='pi pi-pencil' onClick={() => openForm(sn)} />
                                            <Button icon="pi pi-trash" className='ml-auto' severity='danger' onClick={() => onDelete(sn.id)} />
                                        </div>
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