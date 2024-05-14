import React, { useRef } from 'react';
import { DataView } from 'primereact/dataview';
import { useAtom } from 'jotai';
import { racesAtom, selectedRaceAtom } from '../../../atoms/races';
import Loading from '../../../components/UI/Loading';
import useRaces from '../../../hooks/races/useRaces';
import { Button } from 'primereact/button';
import Form from './Form';
import { API_URL } from '../../../consts/api';
import { truncate } from '../../../utils/formatter';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { deleteRace } from '../../../services/backOffice/races';
import { Toast } from 'primereact/toast';

const Races = () => {
    const toast = useRef(null);

    const { races, fetchRaces, loading } = useRaces();

    const setRaces = useAtom(racesAtom)[1];
    const setSelectedRace = useAtom(selectedRaceAtom)[1];

    const openForm = race => {
        setSelectedRace({
            id: race?.id ?? undefined,
            label: race?.label ?? '',
            description: race?.description ?? '',
            image: race?.image ?? undefined
        });
    }

    const onDelete = race => {
        confirmDialog({
            message: `Êtes-vous sûr de vouloir supprimer la race ${race.label}`,
            header: 'Attention',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: () => acceptDelete(race.id),
            acceptLabel: "Oui",
            rejectLabel: "Annuler"
        });
    }

    const acceptDelete = async id => {
        const { deleted, error } = await deleteRace(id);

        if (error) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: error, life: 6000 });
            return;
        }

        if (!deleted) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: "Il y a eu une erreur lors de la suppression de la race", life: 6000 });
            return;
        }

        toast.current.show({ severity: 'success', summary: 'Succès', detail: "La race a été supprimée", life: 6000 });
        fetchRaces();
    }

    const itemTemplate = (race, index) => (
        <>
            <div key={index} className='col-12 lg:col-4 flex flex-column justify-content-center align-items-center gap-2'>
                <div className='flex flex-column justify-content-center align-items-center gap-3'>
                    {race.image ? <img src={`${API_URL}/${race.image}`} alt={race.label} className='max-w-7rem max-h-7rem' /> : null }
                    <div className='flex flex-column gap-2'>
                        <span className='text-center text-xl font-bold'>{race.label}</span>
                        { race.description ? <span className='clamp-50 text-center'>{truncate(race.description, 100)}</span> : null }
                    </div>
                </div>
                <div className='flex flex-row gap-2'>
                    <Button className='bg-secondary border-secondary hover-secondary' icon='pi pi-pencil' onClick={() => openForm(race)} />
                    <Button severity='danger' icon='pi pi-trash' onClick={() => onDelete(race)} />
                </div>
            </div>
        </>
    );

    const listTemplate = races => (
        <div className='grid grid-nogutter p-3'>
            {races.map((race, index) => itemTemplate(race, index))}
        </div>
    );

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />
            <Form />
            <div className='flex-grow-1 bg-primary container'>
                <div className='flex flex-column'>
                    <div className='flex flex-row align-items-center gap-4'>
                        <h2>Vos races</h2>
                        <Button icon="pi pi-plus" label="Ajouter une race" className='bg-secondary border-secondary hover-secondary' onClick={() => openForm()} />
                    </div>
                    { loading ? <Loading /> : (
                        !races?.length ? <span>Aucune race ajoutée</span> :
                        <DataView
                            dataKey='id'
                            value={races}
                            onChange={(e) => setRaces(e.value)}
                            header='Races'
                            listTemplate={listTemplate}
                            layout='grid'
                            paginator
                            rows={20}
                            paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                            currentPageReportTemplate="{first} - {last} sur {totalRecords}"
                            paginatorPosition='both'
                        />
                    ) }
                </div>
            </div>
        </>
    )
}

export default Races;