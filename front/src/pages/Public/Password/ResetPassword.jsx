import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { resetPassword, verifyResetPassword } from '../../../services/front/auth';
import { Password } from 'primereact/password';
import useQuery from '../../../hooks/useQuery';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(undefined);
    const [submitting, setSubmitting] = useState(false);
    const [verified, setVerified] = useState(false);
    const [expired, setExpired] = useState(false);

    const toast = useRef(null);

    const query = useQuery();

    const token = query.get('token');

    useEffect(() => {
        setVerified(false);
        verifyToken(token);
    }, [token]);

    const verifyToken = async token => {
        const { verified, error } = await verifyResetPassword(token);

        setVerified(true);
        setExpired(!verified || error);
    }

    const onSumbit = async () => {
        setError(undefined);

        if (!password || !confirmPassword) {
            setError("Le mot de passe est requis")
            return;
        }

        if (password.length < 8) {
            setError("Le mot de passe doit faire au moins 8 caractères");
            return;
        }

        if (password !== confirmPassword) {
            setError("Les mots de passes ne correspondent pas");
            return;
        }

        setSubmitting(true);
        const { error: err } = await resetPassword(token, password);
        setSubmitting(false);

        if (err) {
            toast.current.show({ severity: 'error', summary: 'Erreur', detail: err, life: 6000 });
            return;
        }

        toast.current.show({ severity: 'success', summary: 'Succès', detail: "Votre mot de passe a été réinitialisé", life: 6000 });

        window.location.href = '/connexion';
    }

    if (!verified)
        return <></>

    return (
        <>
            <Toast ref={toast}/>
            <img src="/assets/login.jpg" alt="connexion" className='absolute w-full h-full fit-cover brightness-80' />

            <div className='w-12 lg:w-6 z-1 h-full flex align-items-center justify-content-center'>
                <div className='flex flex-column justify-content-center align-items-center gap-3 bg-secondary border-round-xl p-3 w-11 lg:w-8'>
                    <h1>Réinitialisation du mot de passe</h1>
                    { expired ?
                        <>
                            <span className='text-lg text-center'>Cette demande est expirée.</span>
                            <div className='flex flex-row gap-3'>
                                <a href="/mot-de-passe-oublie">Nouvelle demande</a>
                                <a href="/">Accueil</a>
                            </div>
                        </>
                    :
                        <div className='flex flex-column gap-3 w-full'>
                            <div className='flex flex-column gap-1 w-full'>
                                <label htmlFor="password" className='text-lg text-primary'>Nouveau mot de passe</label>
                                <Password
                                    id='password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    feedback={false}
                                    toggleMask
                                    required
                                    className='w-full'
                                    pt={{ input: { className: 'w-full' } }}
                                />
                            </div>
                            <div className='flex flex-column gap-1 w-full'>
                                <label htmlFor="confirm-password" className='text-lg text-primary'>Confirmer le mot de passe</label>
                                <Password
                                    id='confirm-password'
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    feedback={false}
                                    toggleMask
                                    required
                                    className='w-full'
                                    pt={{ input: { className: 'w-full' } }}
                                />
                            </div>
                            { error ? <span className='text-red-600 font-bold text-center'>{error}</span> : null }
                            <div className='flex flex-row justify-content-center gap-3'>
                                <Button label='Confirmer' onClick={onSumbit} disabled={submitting || !password || !confirmPassword} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ResetPassword;