'use client';

import React, { useEffect, useState } from 'react';

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
        client_ref: '',
        uploaded_by: null, // Initialize uploaded_by as null
    });
    const [fileId, setFileId] = useState<number | null>(null); // To track the file to be updated

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Function to fetch and pre-fill the file data for updating
    const fetchFileData = async (fileId: number) => {
        try {
            // Fetch the file data by ID
            const { data, error } = await supabase
                .from('files')
                .select('*')
                .eq('id', fileId)
                .single();

            if (error) {
                throw error;
            }

            if (data) {
                // Set the retrieved data in the form
                setFormData(data);
            } else {
                console.error('Data not found for file ID:', fileId);
                setErrorMessage('File not found. Please try again.');
            }
        } catch (error: any) {
            console.error('Error fetching file data:', error.message);
            setErrorMessage('Error fetching file data. Please try again.');
        }
    };

    // Use useEffect to fetch file data when fileId changes
    useEffect(() => {
        if (fileId !== null) {
            fetchFileData(fileId);
        }
    }, [fileId]);

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
                console.error('Error uploading file:', error.message);
                throw new Error('Error uploading file.');
            } else {
                // Update the file record in the "files" table
                const { data: fileData, error: fileError } = await supabase
                    .from('files')
                    .upsert([
                        {
                            id: fileId, // Specify the file ID to update
                            filename: selectedFile.name,
                            filenumber: formData.filenumber,
                            file_type: formData.file_type,
                            user_ref: userId,
                            client_ref: formData.client_ref,
                            uploaded_by: userId, // Store the user's ID in uploaded_by
                        },
                    ]);

                if (fileError) {
                    console.error(
                        'Error updating file record:',
                        fileError.message
                    );
                    setErrorMessage('Error updating file. Please try again.');
                } else {
                    console.log('File updated successfully:', fileData);
                    setSuccessMessage('File updated successfully!');
                }
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (fileId !== null) {
                // Update the file data in the Supabase table based on the file ID
                const { data, error } = await supabase
                    .from('files')
                    .update(formData)
                    .eq('id', fileId)
                    .single();

                if (error) {
                    throw error;
                }

                if (data) {
                    console.log('Update successful:', data);
                    setSuccessMessage('File updated successfully!');
                } else {
                    console.error('Data is null after update.');
                    setErrorMessage('Error updating file. Please try again.');
                }
            } else {
                setErrorMessage('Please select a file to update.');
            }
        } catch (error: any) {
            console.error('Error updating file:', error.message);
            setErrorMessage('Error updating file. Please try again.');
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
                        // value={fileData?.filename || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                        // required
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
                        // required
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
                        accept="image/*"
                        // required
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
                        // required
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
                <div className="mb-4">
                    <label
                        htmlFor="user_id"
                        className="block text-gray-700 font-semibold"
                    >
                        Client
                    </label>
                    <input
                        type="text"
                        id="client_ref"
                        name="client_ref"
                        value={formData.client_ref}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
                        // required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
                >
                    Update File
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
