'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState } from 'react';

const supabase = createClientComponentClient({
    supabaseUrl: 'https://qmixtxydxviqyjplvbit.supabase.co',
    supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaXh0eHlkeHZpcXlqcGx2Yml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MTYzODgsImV4cCI6MjAwOTQ5MjM4OH0.p4xR4FxOFAgnFvDHCPT8vwyloZA56EqKuuE4kF0pAck',
});

export default function AddFileForm() {
    const [formData, setFormData] = useState({
        filename: '',
        filenumber: '',
        file_url: '',
        file_type: '',
        // client_id: '',
        // user_id: '',
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileSelected = async (e: any) => {
        const file = e.target.files[0];
        const filename = `images/${file.name}`;
        if (file) {
            const { data, error } = await supabase.storage
                .from('images')
                .upload(filename, file, {
                    cacheControl: '3600',
                    upsert: false,
                });
            if (error) {
                console.error('Error uploading image:', error.message);
                return;
            }

            const filepath = data.path;
            // Set the file URL in formData
            setFormData({ ...formData, file_url: filepath });
        }
    };

    const handleSubmit = async (e: any) => {
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
                    <label htmlFor="filename" className="block text-gray-700">
                        Filename
                    </label>
                    <input
                        type="text"
                        id="filename"
                        name="filename"
                        value={formData.filename}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="filenumber" className="block text-gray-700">
                        File Number
                    </label>
                    <input
                        type="text"
                        id="filenumber"
                        name="filenumber"
                        value={formData.filenumber}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="file_url" className="block text-gray-700">
                        File URL
                    </label>
                    <input
                        type="file"
                        id="file_url"
                        name="file_url"
                        onChange={handleFileSelected}
                        className="w-full p-2 border rounded"
                        accept="image/*" // Specify accepted file types (images in this case)
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="file_type" className="block text-gray-700">
                        File Type
                    </label>
                    <input
                        type="text"
                        id="file_type"
                        name="file_type"
                        value={formData.file_type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                {/* <div className="mb-4">
                    <label htmlFor="client_id" className="block text-gray-700">
                        Client ID
                    </label>
                    <input
                        type="text"
                        id="client_id"
                        name="client_id"
                        value={formData.client_id}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div> */}
                {/* <div className="mb-4">
                    <label htmlFor="user_id" className="block text-gray-700">
                        User ID
                    </label>
                    <input
                        type="text"
                        id="user_id"
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div> */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
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
