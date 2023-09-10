'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFlutterwave } from 'flutterwave-react-v3';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Icons from 'react-icons/hi';
import { z } from 'zod';

const schema = z.object({
    email: z.string().email('Invalid email').nonempty('Email is required'),
    username: z.string().nonempty('Username is required'),
    phone: z
        .string()
        .min(10, 'Phone must be at least 10 numbers')
        .max(10, 'Phone must be at max 10 numbers')
        .nonempty('Phone Number is required'),
    amount: z.string().min(1, 'Amount must be greater than or equal to 1'),
});

function MakeDonation() {
    const [loading, setLoading] = useState(false);
    // initialize react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const config = {
        public_key: 'FLWPUBK_TEST-8feb5920647d7986d55953d040359960-X',
        tx_ref: Date.now().toString(),
        amount: 500,
        currency: 'UGX',
        payment_options: 'card,mobilemoneyuganda,ussd',
        customer: {
            email: 'davidmatovu88@gmail.com',
            phone_number: '0702629361',
            name: 'David Matovu',
        },
        customizations: {
            title: 'Make a Donation',
            description: 'Payment for donation',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };
    const handleDonations = async (data: any) => {
        setLoading(true);
        // Fetch the necessary information from the data object
        const { email, username, phone, amount } = data;

        // Update the config with the donation details
        config.amount = parseFloat(amount);
        config.customer.email = email;
        config.customer.phone_number = phone;
        config.customer.name = username;
        // Call the Flutterwave payment modal
        handleFlutterPayment({
            callback: () => {
                // Handle the callback logic
            },
            onClose: () => {
                // Handle the onClose logic
            },
        });
    };

    const handleFlutterPayment = useFlutterwave(config);

    useEffect(() => {
        const makePayment = async () => {
            try {
                // Open the Flutterwave payment modal
                const response = await handleFlutterPayment({
                    callback: () => {
                        // Handle the callback logic
                    },
                    onClose: () => {
                        // Handle the onClose logic
                    },
                });

                // Handle the response from Flutterwave
                console.log(response); // Process the response data as needed
            } catch (error) {
                console.log(
                    'An error occurred while making the payment',
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            makePayment();
        }
    }, [loading, handleFlutterPayment]);
    return (
        <main className="w-full flex flex-col items-center justify-center px-4 p-[clamp(8vh,12vh,6vh)]">
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                    <Link
                        href="/"
                        className="flex gap-2 justify-center items-center"
                    >
                        <Icons.HiAcademicCap className="w-6 h-6" />
                        <p className="flex font-bold text-2xl">New Heritage</p>
                    </Link>
                    <div className="mt-5 space-y-2">
                        <h6 className="text-gray-800 text-[14px] font-bold sm:text-[18px]">
                            Make a Donation To make someone smile
                        </h6>
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit(handleDonations)}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label className="font-medium">Name</label>
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
                        <label className="font-medium">Phone Number</label>
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
                        <label className="font-medium">Amount</label>
                        <div className="flex relative">
                            <input
                                type="number"
                                step="1"
                                {...register('amount')}
                                className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${
                                    errors.amount
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                }`}
                            />
                        </div>
                        {errors.amount && (
                            <p className="text-red-500 mt-2">
                                {typeof errors.amount.message === 'string'
                                    ? errors.amount.message
                                    : 'An error occurred'}
                            </p>
                        )}
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 active:scale-95 transition ease-linear rounded-lg duration-150"
                        type="submit"
                    >
                        Make A Donation
                    </button>
                </form>
            </div>
        </main>
    );
}

export default MakeDonation;
