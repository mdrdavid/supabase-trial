'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function FormValidation() {
    const [userName, setUserName] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        let userInput = data.userName;
        setUserName(userInput);
    };
    return (
        <section className="grid w-full place-items-center p-8">
            <form className="form">
                <input
                    {...register('userName')}
                    type="text"
                    placeholder="enter name"
                    className="p-16, rounded border-none outline-none"
                />
                <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    className="mt-4 flex bg-blue-500 px-4 py-2 text-white"
                >
                    sign up
                </button>
            </form>
            <h1 className="mt-8 flex w-full font-bold">
                UserName: {userName}{' '}
            </h1>
        </section>
    );
}

export default FormValidation;
