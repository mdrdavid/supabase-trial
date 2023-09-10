'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

import Alert from '../../components/Alert/Alert';
// import { useAuth } from '../../store/useAuth';

const supabase = createClientComponentClient({
    supabaseUrl: 'https://qmixtxydxviqyjplvbit.supabase.co',
    supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaXh0eHlkeHZpcXlqcGx2Yml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MTYzODgsImV4cCI6MjAwOTQ5MjM4OH0.p4xR4FxOFAgnFvDHCPT8vwyloZA56EqKuuE4kF0pAck',
});
const UpdatePassword = () => {
    // const { validateEmail } = useAuth();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        setError('');
        // if (!validateEmail(email)) {
        //     setError('Enter a valid email.');
        //     return;
        // }
        if (!password) {
            setError('Enter a password.');
            return;
        }
        try {
            setLoading(true);
            //   const { data, error } = await updateUser({ email, password });
            const { data, error } = await supabase.auth.updateUser({
                email: 'new@email.com',
                password: 'new-password',
            });
            if (data) {
                setSuccess('Successfully updated.');
                console.log(data);
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
                    Update your password
                </h1>
                <p>Update your email or password.</p>
            </header>
            <div className="mx-auto">
                <input
                    type="text"
                    className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                    placeholder="mail@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="w-full px-4 py-2 mb-4 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                    placeholder="MyNewPassword12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <Alert text={error} className="alert-danger" />}
            {success && <Alert text={success} className="alert-success" />}
            <div>
                <button
                    className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    {loading ? 'Loading' : 'Update'}
                </button>
            </div>
        </div>
    );
};

export default UpdatePassword;
