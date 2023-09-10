'use client';
import { useState } from 'react';
import Alert from '../Alert/Alert';

import { useAuth } from '@/store/useAuth';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function PasswordRecovery() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | undefined>(undefined);

    // const { validateEmail } = useAuth();

    const supabase = createClientComponentClient({
        supabaseUrl: 'https://qmixtxydxviqyjplvbit.supabase.co',
        supabaseKey:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaXh0eHlkeHZpcXlqcGx2Yml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MTYzODgsImV4cCI6MjAwOTQ5MjM4OH0.p4xR4FxOFAgnFvDHCPT8vwyloZA56EqKuuE4kF0pAck',
    });

    const recoverPassword = async () => {
        setError(undefined);

        // if (!validateEmail(email)) {
        //     setError('Enter a valid email.');
        //     return;
        // }

        try {
            setLoading(true);
            const { data, error } = await supabase.auth.resetPasswordForEmail(
                email
            );
            console.log(data);
            if (data) {
                setSuccess('Successfully reset password.');
            } else if (error) {
                setError('Error coming from Supabase.');
            }
        } catch (error) {
            setError('Error coming from Supabase.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto text-center w-96">
            <header className="my-6">
                <h1 className="mb-2 text-2xl font-bold">
                    Recover your password
                </h1>
                <p>You will receive an email to recover your password.</p>
            </header>
            <div className="mx-auto">
                <input
                    type="text"
                    className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                    placeholder="mail@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            {error && <Alert text={error} className="alert-danger" />}
            {success && <Alert text={success} className="alert-success" />}
            <div>
                <button
                    className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                    disabled={loading}
                    onClick={recoverPassword}
                >
                    {loading ? 'Loading' : 'Send'}
                </button>
            </div>
        </div>
    );
}
