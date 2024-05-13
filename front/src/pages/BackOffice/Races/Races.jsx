import React from 'react';
import { OrderList } from 'primereact/orderlist';
import { useAtom } from 'jotai';
import { racesAtom, selectedRaceAtom } from '../../../atoms/races';
import Loading from '../../../components/UI/Loading';
import useRaces from '../../../hooks/races/useRaces';
import { Button } from 'primereact/button';
import Form from './Form';

const Races = () => {
    const { races, loading } = useRaces();
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

    const itemTemplate = (
        <>
        </>
    );

    return (
        <>
            <Form />
            <div className='flex-grow-1 bg-primary container'>
                <div className='flex flex-column'>
                    <div className='flex flex-row align-items-center gap-4'>
                        <h2>Vos races</h2>
                        <Button icon="pi pi-plus" label="Ajouter une race" className='bg-secondary border-secondary hover-secondary' onClick={() => openForm()} />
                    </div>
                    { loading ? <Loading /> : (
                        !races?.length ? <span>Aucune race ajoutée</span> :
                        <OrderList
                            dataKey='id'
                            value={races}
                            onChange={(e) => setRaces(e.value)}
                            header='Races'
                            itemTemplate={itemTemplate}
                            filter
                            filterBy='label'
                            filterPlaceholder='Rechercher'
                        />
                    ) }
                </div>
            </div>
        </>
    )
}

export default Races;