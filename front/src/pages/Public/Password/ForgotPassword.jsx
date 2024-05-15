import React, { useRef, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { forgotPassord } from '../../../services/front/auth';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    const toast = useRef(null);

    const onSumbit = async () => {
        if (!email) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: "L'adresse e-mail est requise", life: 6000 });
            return;
        }

        setSubmitting(true);
        const { error } = await forgotPassord(email);
        setSubmitting(false);

        if (error) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: error, life: 6000 });
            return;
        }
        
        setDone(true);
    }

    return (
        <>
            <Toast  ref={toast}/>
            <img src="/assets/login.jpg" alt="connexion" className='absolute w-full h-full fit-cover brightness-80' />

            <div className='w-12 lg:w-6 z-1 h-full flex align-items-center justify-content-center'>
                <div className='flex flex-column justify-content-center align-items-center gap-3 bg-secondary border-round-xl p-3 w-11 lg:w-8'>
                    <h1>Mot de passe oublié</h1>
                    { done ?
                        <>
                            <span className='text-lg text-center'>Un e-mail vous a été envoyé pour réinitialiser votre mot de passe.</span>
                            <div className='flex flex-row gap-3'>
                                <a href="/connexion">Se connecter</a>
                                <a href="/">Accueil</a>
                            </div>
                        </>
                    :
                        <>
                            <div className='flex flex-column gap-1 w-full'>
                                <label htmlFor="email" className='text-lg text-primary'>Entrez votre adresse e-mail</label>
                                <InputText
                                    id='email'
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    keyfilter='email'
                                    placeholder='email'
                                    className='w-full'
                                    required
                                    pt={{ input: { className: 'w-full' } }}
                                />
                            </div>
                            <div className='flex flex-row justify-content-center gap-3'>
                                <Button label='Accueil' severity='secondary' onClick={() => window.location.href = '/'} disabled={submitting} />
                                <Button label='Envoyer' onClick={onSumbit} disabled={submitting || !email} />
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;