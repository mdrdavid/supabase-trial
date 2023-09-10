import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
    email: z.string().email('Invalid email').nonempty('Email is required'),
    name: z.string().nonempty('Name is required'),
    phone: z
        .string()
        .min(10, 'Phone must be at least 10 numbers')
        .max(10, 'Phone must be at max 10 numbers')
        .nonempty('Phone Number is required'),
});

export default function ContactComponent() {
    // initialize react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const submitHandler = (data: any) => {
        console.log(data);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-[#bbb] rounded-md p-4 mx-auto shadow-md w-full">
            <div className="text-3xl text-[#00325a] text-center mb-2 font-times pb-5 px-4  ">
                Connect with us
            </div>
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="flex flex-wrap gap-4 justify-center items-center sm:justify-start"
            >
                <input
                    type="text"
                    placeholder="Name"
                    {...register('name')}
                    className={`border-gray-400  focus:outline-none rounded-md px-4 py-2 font-marcellus text-lg ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.name && (
                    <p className="text-red-500 mt-2">
                        {typeof errors.name.message === 'string'
                            ? errors.name.message
                            : 'An error occurred'}
                    </p>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    {...register('email')}
                    className={`border-gray-400  focus:outline-none rounded-md px-4 py-2 font-marcellus text-lg ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                />

                {errors.email && (
                    <p className="text-red-500 mt-2">
                        {typeof errors.email.message === 'string'
                            ? errors.email.message
                            : 'An error occurred'}
                    </p>
                )}
                <input
                    type="tel"
                    placeholder="Phone"
                    {...register('phone')}
                    className={`border-gray-400  focus:outline-none rounded-md px-4 py-2 font-marcellus text-lg ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.phone && (
                    <p className="text-red-500 mt-2">
                        {typeof errors.phone.message === 'string'
                            ? errors.phone.message
                            : 'An error occurred'}
                    </p>
                )}
                <button
                    className=" px-4 py-2 text-white font-medium bg-[#00325a] hover:bg-indigo-500 active:bg-[#00325a] active:scale-95 transition ease-linear rounded-lg duration-150 sm:w-auto"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
