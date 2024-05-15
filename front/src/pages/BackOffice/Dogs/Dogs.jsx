import { Button } from "primereact/button";
import useDogs from "../../../hooks/dogs/useDogs";
import { useRef } from "react";
import { useAtom } from "jotai";
import { dogsAtom, selectedDogAtom } from "../../../atoms/dogsAtoms";
import Loading from '../../../components/UI/Loading';
import { DataView } from 'primereact/dataview';
import { deleteDog } from "../../../services/backOffice/dogs";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const Dogs = () => {

    const toast = useRef(null);

    const { dogs, fetchDogs, loading } = useDogs();

    const setDogs = useAtom(dogsAtom)[1];
    const setSelectedDog = useAtom(selectedDogAtom)[1];

    const onDelete = dog => {
        confirmDialog({
            message: `Êtes-vous sûr de vouloir supprimer le chien ${dog.name}`,
            header: 'Attention',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: () => acceptDelete(dog.id),
            acceptLabel: "Oui",
            rejectLabel: "Annuler"
        });
    }

    const acceptDelete = async id => {
        const { deleted, error } = await deleteDog(id);

        if (error) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: error, life: 6000 });
            return;
        }

        if (!deleted) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: "Il y a eu une erreur lors de la suppression du chien", life: 6000 });
            return;
        }

        toast.current.show({ severity: 'success', summary: 'Succès', detail: "Le chien a été supprimée", life: 6000 });
        fetchDogs();
    }

    const openForm = dog => {
        setSelectedDog({
            id: dog?.id ?? undefined,
            name: dog?.name ?? '',
            age: dog?.age ?? '',
            raceId: dog?.raceId ?? undefined,
        });
    }

    const itemTemplate = (dog, index) => (
        <>
            <div key={index} className='col-12 lg:col-4 flex flex-column justify-content-center align-items-center gap-2'>
                <div className='flex flex-column justify-content-center align-items-center gap-3'>
                        <div className='flex flex-column gap-2'>
                            <span className='text-center text-xl font-bold'>{dog.name}</span>
                            { dog.name ? dog.age + ' mois' : null }
                        </div>
                </div>
                <div className='flex flex-row gap-2'>
                    <Button className='bg-secondary border-secondary hover-secondary' icon='pi pi-pencil' onClick={() => openForm(dog)} />
                    <Button severity='danger' icon='pi pi-trash' onClick={() => onDelete(dog)} />
                </div>
            </div>
        </>
    );

    const listTemplate = dogs => (
        <div className='grid grid-nogutter p-3'>
            {dogs.map((dog, index) => itemTemplate(dog, index))}
        </div>
    );

    return (
        <>
            <div className="flex-grow-1 bg-primary container">
                <div className="flex flex-column">
                    <div className="flex flex-row align-items-center gap-4">
                        <h2>Vos chiens</h2>
                        <Button icon="pi pi-plus" label="Ajouter un chien" className="bg-secondary border-secondary hover-secondary" />
                    </div>
                    {loading ? <Loading /> : (
                        !dogs?.length ? <span>Aucun chien ajouté</span> :
                            <DataView
                                dataKey="id"
                                value={dogs}
                                onChange={(e) => setDogs(e.value)}
                                header="Chiens"
                                listTemplate={listTemplate}
                                layout="grid"
                                paginator
                                rows={20}
                                paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                currentPageReportTemplate="{first} - {last} sur {totalRecords}"
                                paginatorPosition="both"
                            />
                    )
                    }
                </div>
            </div>
        </>
    )
}

export default Dogs;