'use client';

import React, { useState } from 'react';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient({
    supabaseUrl: 'https://qmixtxydxviqyjplvbit.supabase.co',
    supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaXh0eHlkeHZpcXlqcGx2Yml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MTYzODgsImV4cCI6MjAwOTQ5MjM4OH0.p4xR4FxOFAgnFvDHCPT8vwyloZA56EqKuuE4kF0pAck',
});

export default function AddFileForm() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        filename: '',
        filenumber: '',
        file_url: '',
        file_type: '',
        user_ref: '',
        uploaded_by: null, // Initialize uploaded_by as null
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileSelected = async () => {
        if (selectedFile && userId) {
            // Upload the file to Supabase storage
            const { data, error } = await supabase.storage
                .from('files')
                .upload(`user_${userId}/${selectedFile.name}`, selectedFile, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (error) {
                // console.error('Error uploading file:', error.message);
                throw new Error('Error uploading file:');
            } else {
                // Insert the file record into the "files" table
                const { data: fileData, error: fileError } = await supabase
                    .from('files')
                    // .insert([{ filename: selectedFile.name, user_id: userId }]);
                    .insert([
                        {
                            filename: selectedFile.name,
                            filenumber: formData.filenumber,
                            file_type: formData.file_type,
                            user_ref: userId,
                            uploaded_by: userId, // Store the user's ID in uploaded_by
                        },
                    ]);

                if (fileError) {
                    console.error(
                        'Error inserting file record:',
                        fileError.message
                    );
                } else {
                    console.log(
                        'File uploaded and associated with the user:',
                        fileData
                    );
                }
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // Insert the file data into the Supabase table
            const { data, error } = await supabase
                .from('files')
                .insert([formData])
                .select();

            if (error) {
                throw error;
            }

            if (data) {
                console.log('Insertion successful:', data);
                setSuccessMessage('File added successfully!');
            } else {
                console.error('Data is null after insertion.');
                setErrorMessage('Error adding file. Please try again.');
            }
        } catch (error: any) {
            console.error('Error adding file:', error.message);
            setErrorMessage('Error adding file. Please try again.');
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-semibold mb-4">Add File</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="filename"
                        className="block text-gray-700 font-semibold"
                    >
                        Filename
                    </label>
                    <input
                        type="text"
                        id="filename"
                        name="filename"
                        value={formData.filename}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="filenumber"
                        className="block text-gray-700 font-semibold"
                    >
                        File Number
                    </label>
                    <input
                        type="text"
                        id="filenumber"
                        name="filenumber"
                        value={formData.filenumber}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="file_url"
                        className="block text-gray-700 font-semibold"
                    >
                        File URL
                    </label>
                    <input
                        type="file"
                        id="file_url"
                        name="file_url"
                        onChange={handleFileSelected}
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                        accept="image/*" // Specify accepted file types (images in this case)
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="file_type"
                        className="block text-gray-700 font-semibold"
                    >
                        File Type
                    </label>
                    <input
                        type="text"
                        id="file_type"
                        name="file_type"
                        value={formData.file_type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="user_id"
                        className="block text-gray-700 font-semibold"
                    >
                        User
                    </label>
                    <input
                        type="text"
                        id="user_ref"
                        name="user_ref"
                        value={formData.user_ref}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                        // required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
                >
                    Add File
                </button>
                {successMessage && (
                    <p className="text-green-500 mt-4">{successMessage}</p>
                )}
                {errorMessage && (
                    <p className="text-red-500 mt-4">{errorMessage}</p>
                )}
            </form>
        </div>
    );
}
