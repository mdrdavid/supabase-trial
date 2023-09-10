'use client';
import { useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient({
    supabaseUrl: 'https://qmixtxydxviqyjplvbit.supabase.co',
    supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaXh0eHlkeHZpcXlqcGx2Yml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MTYzODgsImV4cCI6MjAwOTQ5MjM4OH0.p4xR4FxOFAgnFvDHCPT8vwyloZA56EqKuuE4kF0pAck',
});

export default function AddClient() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        phonenumber: '',
        address: '',
        email: '',
        // image: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0];
    //     if (file) {
    //         setFormData({ ...formData, image: file });
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Upload the image to Supabase storage (if provided)
            let imageUrl = null;

            // Insert the client data into the Supabase table
            const { data, error } = await supabase
                .from('clients')
                .insert([
                    {
                        firstname: formData.firstname,
                        lastname: formData.lastname,
                        phonenumber: parseInt(formData.phonenumber), // Convert to integer if phonenumber is a bigint
                        address: formData.address,
                        email: formData.email,
                        // image_url: imageUrl,
                    },
                ])
                .select();

            if (error) {
                throw error;
            }

            // Clear the form after successful submission
            setFormData({
                firstname: '',
                lastname: '',
                phonenumber: '', // Clear phone number field too
                address: '',
                email: '',
                // image: null,
            });

            console.log(data);
            alert('Client added successfully!');
        } catch (error: any) {
            console.error('Error adding client:', error.message);
            alert('Error adding client. Please try again.');
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-semibold mb-4">Add Client</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="phonenumber"
                        className="block text-gray-700"
                    >
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phonenumber"
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                {/* Add similar fields for last name, phone number, address, email */}
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700">
                        Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        // onChange={handleImageChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add Client
                </button>
            </form>
        </div>
    );
}
