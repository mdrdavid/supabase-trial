'use client';
import { useEffect, useState } from 'react';

import LayoutComponent from '@/components/LayoutComponent/LayoutComponent';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient({
    supabaseUrl: 'https://qmixtxydxviqyjplvbit.supabase.co',
    supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaXh0eHlkeHZpcXlqcGx2Yml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MTYzODgsImV4cCI6MjAwOTQ5MjM4OH0.p4xR4FxOFAgnFvDHCPT8vwyloZA56EqKuuE4kF0pAck',
});

// Define the type for a file object
type File = {
    id: number;
    filename: '';
    filenumber: '';
    file_url: '';
    file_type: '';
    user_id: string;
};

export default function Files() {
    // const router = useRouter();
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        async function fetchFiles() {
            try {
                const { data: files, error } = await supabase
                    .from('files')
                    .select('*');

                if (error) {
                    throw error;
                }
                if (files) {
                    console.log(files);
                }
                setFiles(files);
            } catch (error: any) {
                console.error('Error fetching files:', error.message);
            }
        }

        fetchFiles();
    }, []);

    // Function to fetch a file by ID
    const fetchFileById = async (id: number) => {
        try {
            const { data: file, error } = await supabase
                .from('files')
                .select('*')
                .eq('id', id)
                .single(); // Use single() to fetch a single record

            if (error) {
                throw error;
            }
            // Check if file.user_id is not null
            if (file.user_ref) {
                // Fetch the associated user
                const { data: user, error: userError } = await supabase
                    .from('custom_users')
                    .select('id')
                    .eq('id', file.user_ref)
                    .single(); // Use single() to fetch a single user

                if (userError) {
                    throw userError;
                }

                // Combine the file and user data
                const fileWithUser = { ...file, id: user?.id };
                return fileWithUser;
            } else {
                // If file.user_id is null, return the file without user information
                return file;
            }
        } catch (error: any) {
            console.error('Error fetching file by ID:', error.message);
        }
    };

    // Handle clicking on a file
    const handleFileClick = async (id: number) => {
        const file = await fetchFileById(id);
        if (file) {
            console.log('File Data', file);
            // window.location.href = `/file/${file.id}`;

            // router.push(`/file/${file.id}`); // Assuming you have a route for file details
            // window.location.href = `https://qmixtxydxviqyjplvbit.supabase.co${file.file_url}`;
            // window.location.href =
            //     'https://qmixtxydxviqyjplvbit.supabase.co/storage/v1/object/sign/images/images/Compter%20units.JPG?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvaW1hZ2VzL0NvbXB0ZXIgdW5pdHMuSlBHIiwiaWF0IjoxNjk0MTc3NTA0LCJleHAiOjE2OTQ3ODIzMDR9.M_5cBMoZKzD8EWNHabOLAbUwrEHMSjfP2IMCIBFZeeA&t=2023-09-08T12%3A51%3A44.196Z';
        }
    };

    return (
        <LayoutComponent>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold mb-4">Files</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {files.map((file: any) => (
                        <div
                            key={file.id}
                            className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition duration-300"
                            onClick={() => handleFileClick(file.id)}
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {file.filename} {file.filenumber}
                            </h2>
                            <h2 className="text-xl font-semibold mb-2">
                                {file.filenumber}
                            </h2>
                            <p className="text-gray-600">{file.file_url}</p>
                            <p className="text-gray-600">{file.file_type}</p>
                        </div>
                    ))}
                </div>
            </div>
        </LayoutComponent>
    );
}
