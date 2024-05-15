import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { tokenAtom } from '../../../atoms/authAtom';
import { login as loginService} from '../../../services/front/auth';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';

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
                    <div className='flex flex-column gap-5 w-full'>
                        <FloatLabel pt={{ root: { className: 'w-full' } }}>
                            <InputText
                                id='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                keyfilter='email'
                                placeholder='e-mail'
                                className='w-full'
                                pt={{ input: { className: 'w-full' } }}
                            />
                            <label htmlFor="email">E-mail</label>
                        </FloatLabel>
                        <FloatLabel pt={{ root: { className: 'w-full' } }}>
                            <Password
                                id='password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                feedback={false}
                                toggleMask
                                className='w-full'
                                pt={{ root: { className: 'w-full' }, input: { className: 'w-full' } }}
                            />
                            <label htmlFor="password">Mot de passe</label>
                        </FloatLabel>
                    </div>
                    <a href="/mot-de-passe-oublie" className='ml-auto text-sm'>Mot de passe oublié</a>
                    { error ? <span className='text-red-500 font-bold'>{error}</span> : null }
                    <Button label='Connexion' onClick={login} disabled={submitting} />
                </div>
            </div>
        </>
    )
}

export default Login;