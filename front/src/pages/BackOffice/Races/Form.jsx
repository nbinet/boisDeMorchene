import React, { useEffect, useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { setRace } from '../../../services/backOffice/races';
import { useAtom, useAtomValue } from 'jotai';
import { selectedRaceAtom } from '../../../atoms/racesAtoms';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import useRaces from '../../../hooks/races/useRaces';
import { API_URL } from '../../../consts/api';
import { tokenAtom } from '../../../atoms/authAtom';

const Form = () => {
    const [image, setImage] = useState(undefined);

    const toast = useRef(null);
    const fileUploadRef = useRef(null);

    const { fetchRaces } = useRaces();

    const [selectedRace, setSelectedRace] = useAtom(selectedRaceAtom);
    const token = useAtomValue(tokenAtom);

    const initialValues = { ...selectedRace };

    useEffect(() => {
        setImage(selectedRace?.image ?? undefined);
    }, [selectedRace]);

    const validate = values => {
        const errors = {};

        if (!values.label)
            errors.label = "Le nom est requis";
        
        if (values?.label?.length > 255)
            errors.label = "Le nom ne peut pas faire plus de 255 caractères";
        
        if (values?.description?.length > 2000)
            errors.label = "La description ne peut pas faire plus de 2000 caractères";

        return errors;
    }

    const onSubmit = async (values, { setSubmitting }) => {
        const formData = new FormData();
        formData.append('label', values.label);
        formData.append('description', values.description);
        formData.append('image', image);

        if (selectedRace.id)
            formData.append('id', selectedRace.id)

        const { updated, error } = await setRace(formData, token);
        setSubmitting(false);

        if (error) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: error, life: 6000 });
            return;
        }

        if (!updated) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: "Il y a eu une erreur lors de la mise à jour des informations", life: 6000 });
            return;
        }

        toast.current.show({ severity: 'success', summary: 'Succès', detail: selectedRace.id ? "Les informations ont été modifiées" : "La race a été créée", life: 6000 });
        setSelectedRace(undefined);
        fetchRaces();
    }

    return (
        <>
            <Toast ref={toast} />
            <Dialog visible={!!selectedRace} onHide={() => setSelectedRace(undefined)} header={selectedRace?.id ? 'Modification de la race' : 'Nouvelle race'} draggable={false} blockScroll resizable={false} className='w-12 lg:w-9'>
                <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} validateOnBlur={false} validateOnChange={false}>
                    { ({ isSubmitting }) => (
                        <FormikForm className='grid row-gap-5 py-4'>
                            <Field name="label">
                                {({ field, form }) => (
                                    <div className='flex flex-column gap-2 col-12'>
                                        <span className="p-float-label">
                                            <InputText
                                                id={field.name}
                                                value={field.value ?? ''}
                                                onChange={e => field.onChange(e)}
                                                placeholder='Nom'
                                                pt={{ root: { className: 'w-full' } }}
                                                className={classNames({ 'p-invalid': form.errors.label })}
                                            />
                                            <label htmlFor={field.name}>Nom <span className='text-red-500'>*</span></label>
                                        </span>
                                        <ErrorMessage name='label' component='div' className='text-red-500' />
                                    </div>
                                )}
                            </Field>
                            <Field name="description">
                                {({ field, form }) => (
                                    <div className='flex flex-column gap-2 col-12'>
                                        <span className="p-float-label">
                                            <InputTextarea
                                                id={field.name}
                                                value={field.value ?? ''}
                                                onChange={e => field.onChange(e)}
                                                placeholder='Description'
                                                rows={5}
                                                pt={{ root: { className: 'w-full' } }}
                                                className={classNames({ 'p-invalid': form.errors.description })}
                                            />
                                            <label htmlFor={field.name}>Description</label>
                                        </span>
                                        <ErrorMessage name='description' component='div' className='text-red-500' />
                                    </div>
                                )}
                            </Field>
                            <div className='col-12 lg:col-6'>
                                <div className='flex flex-column gap-2'>
                                    <label htmlFor="name">Image</label>
                                    <div className='flex flex-row align-items-center gap-4'>
                                        <div className='flex flex-column align-items-center gap-2'>
                                            { !image ?
                                                <FileUpload
                                                    mode="basic"
                                                    accept="image/*"
                                                    onSelect={e => setImage(e.files[0])}
                                                    chooseLabel='Choisir'
                                                    customUpload
                                                    ref={fileUploadRef}
                                                />
                                            : null }
                                        </div>
                                        { image ?
                                            <div className='flex flex-grow-1 flex-row align-items-center gap-2'>
                                                <img src={typeof image == 'string' ? `${API_URL}/${image}` : image.objectURL} alt='race' className='max-h-10rem w-auto' />
                                                <Button icon="pi pi-times" text rounded onClick={() => { setImage(undefined) }} className='text-red-500' />
                                            </div>
                                        : null }
                                    </div>
                                </div>
                            </div>
                            <div className='col-12 flex flex-row gap-3 justify-content-end'>
                                <Button label="Annuler" severity='secondary' type='button' className='mt-3 align-self-end' onClick={() => setSelectedRace(undefined)} disabled={isSubmitting} />
                                <Button label="Sauvegarder" severity='success' type='submit' className='mt-3 align-self-end' disabled={isSubmitting} />
                            </div>
                        </FormikForm>
                    )}
                </Formik>
            </Dialog>
        </>
    )
}

export default Form;