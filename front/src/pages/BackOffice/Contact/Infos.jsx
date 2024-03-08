import React, { useRef } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import useInfos from '../../../hooks/contact/UseInfos';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { classNames } from 'primereact/utils';
import { setContactInfos } from '../../../services/backOffice/contact';

const Infos = () => {
    const toast = useRef();

    const { infos = {} } = useInfos();

    const initialValues = { ...infos }

    const validate = values => {
        const errors = {};

        if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
            errors.email = "L'adresse email n'est pas au bon format.";

        if (values.phone && !/^(?:(?:\+|00)|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/i.test(values.phone.replace(/\s/, '')))
            errors.phone = "Le numéro de téléphone n'est pas au bon format";

        if (values.latitude && !/^(\+|-)?(?:90(?:(?:\.0*)?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]*)?))$/i.test(values.latitude))
            errors.latitude = "La latitude n'est pas au bon format";

        if (values.longitude && !/^(\+|-)?(?:180(?:(?:\.0*)?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]*)?))$/i.test(values.longitude))
            errors.longitude = "La longitude n'est pas au bon format";

        return errors;
    }

    const onSubmit = async (values, { setSubmitting }) => {
        const { updated, error } = await setContactInfos(values);
        setSubmitting(false);
        if (error) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: error, life: 6000 });
            return;
        }

        if (!updated) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: "Il y a eu une erreur lors de la mise à jour des informations", life: 6000 });
            return;
        }

        toast.current.show({ severity: 'success', summary: 'Succès', detail: "Les informations ont été modifiées", life: 6000 });
    }

    return (
        <>
            <Toast ref={toast} />
            <Card className='border-0 border-round-xl p-3 w-full' pt={{ content: { className: 'p-0 '} }}>
                <h2 className='mt-0 mb-5'>Modifier vos informations de contact</h2>
                <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} validateOnBlur={false} validateOnChange={false} enableReinitialize={true}>
                    { ({ isSubmitting }) => (
                        <Form className='grid row-gap-5'>
                            <Field name="email">
                                {({ field, form }) => (
                                    <div className='flex flex-column gap-2 col-12 lg:col-6'>
                                        <span className="p-float-label">
                                            <InputText
                                                id={field.name}
                                                value={field.value ?? ''}
                                                onChange={e => field.onChange(e)}
                                                placeholder='E-mail'
                                                keyfilter="email"
                                                pt={{ root: { className: 'w-full' } }}
                                                className={classNames({ 'p-invalid': form.errors.email })}
                                            />
                                            <label htmlFor={field.name}>E-mail</label>
                                        </span>
                                        <ErrorMessage name='email' component='div' className='text-red-500' />
                                    </div>
                                )}
                            </Field>
                            <Field name="phone">
                                {({ field, form }) => (
                                    <div className='flex flex-column gap-2 col-12 lg:col-6'>
                                        <span className="p-float-label">
                                            <InputMask
                                                id={field.name}
                                                value={field.value}
                                                onChange={e => field.onChange(e)}
                                                placeholder='Téléphone'
                                                mask='99 99 99 99 99'
                                                slotChar=''
                                                pt={{ root: { className: 'w-full' } }}
                                                className={classNames({ 'p-invalid': form.errors.phone })}
                                            />
                                            <label htmlFor={field.name}>Téléphone</label>
                                        </span>
                                        <ErrorMessage name='phone' component='div' className='text-red-500' />
                                    </div>
                                )}
                            </Field>
                            <Field name="address">
                                {({ field, form }) => (
                                    <span className="p-float-label col-12 lg:col-6">
                                        <InputText
                                            id={field.name}
                                            value={field.value ?? ''}
                                            onChange={e => field.onChange(e)}
                                            placeholder='Adresse'
                                            pt={{ root: { className: 'w-full' } }}
                                            className={classNames({ 'p-invalid': form.errors.address })}
                                        />
                                        <label htmlFor={field.name}>Adresse</label>
                                    </span>
                                )}
                            </Field>
                            <Field name="timetable">
                                {({ field, form }) => (
                                    <span className="p-float-label col-12 lg:col-6">
                                        <InputText
                                            id={field.name}
                                            value={field.value ?? ''}
                                            onChange={e => field.onChange(e)}
                                            placeholder='Horaires'
                                            pt={{ root: { className: 'w-full' } }}
                                            className={classNames({ 'p-invalid': form.errors.timetable })}
                                        />  
                                        <label htmlFor={field.name}>Horaires</label>
                                    </span>
                                )}
                            </Field>
                            <Field name="latitude">
                                {({ field, form }) => (
                                    <div className='flex flex-column gap-2 col-12 lg:col-6'>
                                        <span className="p-float-label">
                                            <InputText
                                                id={field.name}
                                                value={field.value ?? ''}
                                                onChange={e => field.onChange(e)}
                                                placeholder='Latitude'
                                                keyfilter={'num'}
                                                pt={{ root: { className: 'w-full' } }}
                                                className={classNames({ 'p-invalid': form.errors.latitude })}
                                            />
                                            <label htmlFor={field.name}>Latitude</label>
                                        </span>
                                        <ErrorMessage name='latitude' component='div' className='text-red-500' />
                                    </div>
                                )}
                            </Field>
                            <Field name="longitude">
                                {({ field, form }) => (
                                    <div className='flex flex-column gap-2 col-12 lg:col-6'>
                                        <span className="p-float-label">
                                            <InputText
                                                id={field.name}
                                                value={field.value ?? ''}
                                                onChange={e => field.onChange(e)}
                                                placeholder='longitude'
                                                keyfilter={'num'}
                                                pt={{ root: { className: 'w-full' } }}
                                                className={classNames({ 'p-invalid': form.errors.longitude })}
                                            />
                                            <label htmlFor={field.name}>Longitude</label>
                                        </span>
                                        <ErrorMessage name='longitude' component='div' className='text-red-500' />
                                    </div>
                                )}
                            </Field>
                            <div className='col-12 flex flex-column'>
                                <Button label="Sauvegarder" severity='success' type='submit' className='mt-3 align-self-end' disabled={isSubmitting} />
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </>
    )
}

export default Infos;