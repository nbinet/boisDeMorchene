import React, { useRef, useState } from 'react';
import { login as loginService} from '../../../services/front/auth';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);

    const toast = useRef(null);

    const onSumbit = async () => {
        setSubmitting(true);

        const { error } = await loginService(email);

        if (error) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: error, life: 6000 });
            return;
        }
        
        setSubmitting(false);
        setDone(true);
    }

    return (
        <>
            <Toast />
            <img src="/assets/login.jpg" alt="connexion" className='absolute w-full h-full fit-cover brightness-80' />

            <div className='w-12 lg:w-6 z-1 h-full flex align-items-center justify-content-center'>
                <div className='flex flex-column justify-content-center align-items-center gap-3 bg-secondary border-round-xl p-3 w-11 lg:w-8'>
                    <h1>Mot de passe oublié</h1>
                    { done ?
                        <>
                            <span>Un e-mail vous a été envoyé pour réinitialiser votre mot de passe.</span>
                            <a href="/connexion">Se connecter</a>
                            <a href="/">Accueil</a>
                        </>
                    :
                        <>
                            <InputText
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                keyfilter='email'
                                placeholder='email'
                                className='w-full'
                                pt={{ input: { className: 'w-full' } }}
                            />
                            <Button label='Envoyer' onClick={onSumbit} disabled={submitting} />
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;