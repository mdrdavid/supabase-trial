'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Icons from 'react-icons/hi';
import { z } from 'zod';

const supabase = createClientComponentClient({
    supabaseUrl: 'https://qmixtxydxviqyjplvbit.supabase.co',
    supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaXh0eHlkeHZpcXlqcGx2Yml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MTYzODgsImV4cCI6MjAwOTQ5MjM4OH0.p4xR4FxOFAgnFvDHCPT8vwyloZA56EqKuuE4kF0pAck',
});
const schema = z.object({
    email: z.string().email('Invalid email').nonempty('Email is required'),
    username: z.string().nonempty('Username is required'),
    phone: z
        .string()
        .min(10, 'Phone must be at least 10 numbers')
        .max(10, 'Phone must be at max 10 numbers')
        .nonempty('Phone Number is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .nonempty('Password is required'),
    first_name: z.string().nonempty('First Name is required'), // Add First Name field
    last_name: z.string().nonempty('Last Name is required'), // Add Last Name field
    role: z.string().nonempty('Role is required'), // Add Role field
});

function InviteUser() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // initialize react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const handleInvite = async (values: any) => {
        try {
            // const { data, error } = await supabase.auth.signUp({
            //     email: values.email,
            //     password: values.password,
            //     phone: values.phone,
            // });
            const { data, error } = await supabase.auth.api.inviteUserByEmail({
                email: values.email,
            });

            if (error) {
                throw error;
            }
            // Insert additional user details into the custom_users table
            const { data: customUser, error: insertError } = await supabase
                .from('custom_users')
                .upsert([
                    {
                        id: data?.user?.id, // Link the custom user to the auth user using user_id
                        username: values.username,
                        first_name: values.first_name,
                        last_name: values.last_name,
                        role: values.role,
                        phone_number: values.phone,
                        // more user details here
                    },
                ]);

            if (insertError) {
                throw insertError;
            }

            console.log(
                'User signed up and custom details stored:',
                data?.user,
                customUser
            );
            console.log(data);
        } catch (error: any) {
            console.error('Error signing up:', error.message);
        }
    };
    return (
        <main className="w-full flex flex-col items-center justify-center px-4 p-[clamp(8vh,12vh,6vh)]">
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                    <Link
                        href="/"
                        className="flex gap-2 justify-center items-center"
                    >
                        <Icons.HiAcademicCap className="w-6 h-6" />
                        <p className="flex font-bold">Green Valley Brothers</p>
                    </Link>
                    <div className="mt-5 space-y-2">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                            Create An Account.
                        </h3>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit(handleInvite)}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label className="font-medium">First Name</label>
                        <input
                            type="text"
                            {...register('first_name')}
                            className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${
                                errors.first_name
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            }`}
                        />

                        {errors.first_name && (
                            <p className="text-red-500 mt-2">
                                {typeof errors.first_name.message === 'string'
                                    ? errors.first_name.message
                                    : 'An error occurred'}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="font-medium">Last Name</label>
                        <input
                            type="text"
                            {...register('last_name')}
                            className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${
                                errors.last_name
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            }`}
                        />

                        {errors.last_name && (
                            <p className="text-red-500 mt-2">
                                {typeof errors.last_name.message === 'string'
                                    ? errors.last_name.message
                                    : 'An error occurred'}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="font-medium">Username</label>
                        <input
                            type="text"
                            {...register('username')}
                            className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${
                                errors.username
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            }`}
                        />

                        {errors.username && (
                            <p className="text-red-500 mt-2">
                                {typeof errors.username.message === 'string'
                                    ? errors.username.message
                                    : 'An error occurred'}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="font-medium">Role</label>
                        <input
                            type="text"
                            {...register('role')}
                            className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${
                                errors.role
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            }`}
                        />

                        {errors.role && (
                            <p className="text-red-500 mt-2">
                                {typeof errors.role.message === 'string'
                                    ? errors.role.message
                                    : 'An error occurred'}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="font-medium">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${
                                errors.email
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            }`}
                        />

                        {errors.email && (
                            <p className="text-red-500 mt-2">
                                {typeof errors.email.message === 'string'
                                    ? errors.email.message
                                    : 'An error occurred'}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="font-medium">Phone</label>
                        <input
                            type="tel"
                            {...register('phone')}
                            className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${
                                errors.phone
                                    ? 'border-red-500'
                                    : 'border-gray-300'
                            }`}
                        />

                        {errors.phone && (
                            <p className="text-red-500 mt-2">
                                {typeof errors.phone.message === 'string'
                                    ? errors.phone.message
                                    : 'An error occurred'}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="font-medium">Password</label>
                        <div className="flex relative">
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                {...register('password')}
                                className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${
                                    errors.password
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                            />
                            <div className="flex absolute right-2 top-5 pl-4">
                                {isPasswordVisible ? (
                                    <Icons.HiEye
                                        className="h-5 w-5 text-slate-400 transition ease-linear"
                                        onClick={() =>
                                            setIsPasswordVisible(false)
                                        }
                                    />
                                ) : (
                                    <Icons.HiEyeOff
                                        className="h-5 w-5 text-slate-400 transition ease-linear"
                                        onClick={() =>
                                            setIsPasswordVisible(true)
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 mt-2">
                                {/* {errors.password.message} */}
                            </p>
                        )}
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 active:scale-95 transition ease-linear rounded-lg duration-150"
                        type="submit"
                    >
                        Sign up
                    </button>
                    <div className="w-full flex flex-col justify-between items-center gap-4 text-center">
                        <p className="flex gap-2">
                            Already have an account?
                            <Link
                                href="/login"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Login
                            </Link>
                        </p>
                        <Link
                            href="#"
                            className="hover:text-indigo-600 flex gap-2 items-center justify-center w-full text-sm"
                        >
                            <Icons.HiExternalLink />
                            <span className="flex">
                                By Signing Up You Agree To Terms And Conditions
                            </span>
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default InviteUser;
