import React, { useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';
import { useAtom } from 'jotai';
import useSocialNetworks from '../../../hooks/contact/useSocialNetworks';
import useAllSocialNetworks from '../../../hooks/contact/useAllSocialNetworks';
import { selectedSocialNetworkAtom } from '../../../atoms/tmp/contactAtoms';
import { Dropdown } from 'primereact/dropdown';
import { setSocialNetwork } from '../../../services/backOffice/contact';

const Form = () => {
    const toast = useRef(null);

    const { allSocialNetworks } = useAllSocialNetworks();
    const { fetchSocialNetworks } = useSocialNetworks();

    const [selectedSocialNetwork, setSelectedSocialNetwork] = useAtom(selectedSocialNetworkAtom);

    const initialValues = { ...selectedSocialNetwork };

    const validate = values => {
        const errors = {};

        if (!values.label)
            errors.label = "Le nom est requis";
        
        if (!allSocialNetworks.includes(values.label))
            errors.label = "Ce réseau social n'est pas pris en charge";
        
        if (!values.url)
            errors.url = "L'URL est requise";

        if (!values.url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/))
            errors.url = "L'URL n'est pas au bon format";

        return errors;
    }

    const onSubmit = async (values, { setSubmitting }) => {
        const { updated, error } = await setSocialNetwork(values);
        setSubmitting(false);

        if (error) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: error, life: 6000 });
            return;
        }

        if (!updated) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: "Il y a eu une erreur lors de la mise à jour des informations", life: 6000 });
            return;
        }

        toast.current.show({ severity: 'success', summary: 'Succès', detail: selectedSocialNetwork.id ? "Les informations ont été modifiées" : "Le réseau social a été créée", life: 6000 });
        setSelectedSocialNetwork(undefined);
        fetchSocialNetworks();
    }

    return (
        <>
            <Toast ref={toast} />
            <Dialog visible={!!selectedSocialNetwork} onHide={() => setSelectedSocialNetwork(undefined)} header={selectedSocialNetwork?.id ? 'Modification du réseau social' : 'Nouveau réseau social'} draggable={false} blockScroll resizable={false} className='w-12 lg:w-9'>
                <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} validateOnBlur={false} validateOnChange={false}>
                    { ({ isSubmitting }) => (
                        <FormikForm className='grid row-gap-5 py-4'>
                            <Field name="label">
                                {({ field, form }) => (
                                    <div className='flex flex-column gap-2 col-12'>
                                        <span className="p-float-label">
                                            <Dropdown
                                                id={field.name}
                                                value={field.value ?? ''}
                                                options={allSocialNetworks}
                                                onChange={e => field.onChange(e)}
                                                placeholder='Réseau social'
                                                pt={{ root: { className: 'w-full' } }}
                                                className={classNames({ 'p-invalid': form.errors.label })}
                                            />
                                            <label htmlFor={field.name}>Réseau social <span className='text-red-500'>*</span></label>
                                        </span>
                                        <ErrorMessage name='label' component='div' className='text-red-500' />
                                    </div>
                                )}
                            </Field>
                            <Field name="url">
                                {({ field, form }) => (
                                    <div className='flex flex-column gap-2 col-12'>
                                        <span className="p-float-label">
                                            <InputText
                                                id={field.name}
                                                value={field.value ?? ''}
                                                onChange={e => field.onChange(e)}
                                                placeholder='URL'
                                                pt={{ root: { className: 'w-full' } }}
                                                className={classNames({ 'p-invalid': form.errors.label })}
                                            />
                                            <label htmlFor={field.name}>URL <span className='text-red-500'>*</span></label>
                                        </span>
                                        <ErrorMessage name='url' component='div' className='text-red-500' />
                                    </div>
                                )}
                            </Field>
                            <div className='col-12 flex flex-row gap-3 justify-content-end'>
                                <Button label="Annuler" severity='secondary' type='button' className='mt-3 align-self-end' onClick={() => setSelectedSocialNetwork(undefined)} disabled={isSubmitting} />
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