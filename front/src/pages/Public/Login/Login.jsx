import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { tokenAtom } from '../../../atoms/authAtom';
import { login as loginService} from '../../../services/front/auth';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

const Login = () => {
    const setToken = useAtom(tokenAtom)[1];

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const login = async () => {
        setSubmitting(true);
        setError('');

        const { token, error } = await loginService(email, password);

        if (error) {
            setError('Identifiants invalides');
            setSubmitting(false);
            return;
        }

        if (!token) {
            setError('Aucune connexion à internet');
            setSubmitting(false);
            return;
        }
        
        setToken(token);
        setSubmitting(false);
        window.location.href = '/admin';
    }

    return (
        <>
            <img src="/assets/login.jpg" alt="connexion" className='absolute w-full h-full fit-cover brightness-80' />

            <div className='w-12 lg:w-6 z-1 h-full flex align-items-center justify-content-center'>
                <div className='flex flex-column justify-content-center align-items-center gap-3 bg-secondary border-round-xl p-3 w-11 lg:w-8'>
                    <h1>Connexion</h1>
                    <div className='flex flex-column gap-3 w-full'>
                        <div className='flex flex-column gap-1'>
                            <label htmlFor="email" className='text-lg text-primary'>E-mail</label>
                            <InputText
                                id='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                keyfilter='email'
                                placeholder='e-mail'
                                required
                                className='w-full'
                                pt={{ input: { className: 'w-full' } }}
                            />
                        </div>
                        <div className='flex flex-column gap-1'>
                            <label htmlFor="password" className='text-lg text-primary'>Mot de passe</label>
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
                    </div>
                    <a href="/mot-de-passe-oublie" className='ml-auto text-sm'>Mot de passe oublié</a>
                    { error ? <span className='text-red-600 font-bold text-center'>{error}</span> : null }
                    <div className='flex flex-row justify-content-center gap-3'>
                        <Button label='Accueil' severity='secondary' onClick={() => window.location.href = '/'} disabled={submitting} />
                        <Button label='Connexion' onClick={login} disabled={submitting} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;