'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';

import { createClient } from '@supabase/supabase-js';
import * as Yup from 'yup';

// Create a single supabase client for interacting with your database
// const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_API_KEY')
const supabase = createClientComponentClient({
    supabaseUrl: 'https://qmixtxydxviqyjplvbit.supabase.co',
    supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaXh0eHlkeHZpcXlqcGx2Yml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MTYzODgsImV4cCI6MjAwOTQ5MjM4OH0.p4xR4FxOFAgnFvDHCPT8vwyloZA56EqKuuE4kF0pAck',
});

const validationSchema = Yup.object({
    email: Yup.string()
        .min(2, 'User Name must be at least 2 characters')
        .required('User Name is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const Login = () => {
    const [error, setError] = useState('');

    const login = async (values: any) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: values.email, // Assuming email is an email
                password: values.password,
            });

            if (error) {
                setError(error.message);
            } else {
                // User is successfully logged in
                console.log('User logged in:', data);
            }
        } catch (error: any) {
            console.error('Error logging in:', error.message);
        }
    };
    const register = (values: any) => {
        console.log('values', values);
    };

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={validationSchema}
                onSubmit={login}
            >
                {({ errors, touched }) => (
                    <Form className="">
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                User Name:
                            </label>
                            <Field
                                type="text"
                                id="email"
                                name="email"
                                className={`${
                                    errors.email && touched.email
                                        ? 'border-red-500'
                                        : 'border-gray-300 '
                                } w-full mt-2 px-2 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg `}
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-xs italic"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Password:
                            </label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                className={`${
                                    errors.password && touched.password
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                } w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg `}
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-xs italic"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 active:scale-95 transition ease-linear rounded-lg duration-150"
                        >
                            Login
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;
