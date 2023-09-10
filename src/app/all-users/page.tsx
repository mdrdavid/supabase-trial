'use client';
import { useEffect, useState } from 'react';

import LayoutComponent from '@/components/LayoutComponent/LayoutComponent';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient({
    supabaseUrl: 'https://qmixtxydxviqyjplvbit.supabase.co',
    supabaseKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaXh0eHlkeHZpcXlqcGx2Yml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5MTYzODgsImV4cCI6MjAwOTQ5MjM4OH0.p4xR4FxOFAgnFvDHCPT8vwyloZA56EqKuuE4kF0pAck',
});

// Define the type for a user object
type User = {
    id: number;
    email: string;
};
export default function Clients() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const { data: users, error } = await supabase
                    .from('users')
                    .select('*');

                if (error) {
                    throw error;
                }
                console.log(users);
                // setUsers(users);
                // Fetch associated files for each user
                const usersWithFiles = await Promise.all(
                    users.map(async (user) => {
                        // Fetch files associated with the user
                        const { data: files, error: filesError } =
                            await supabase
                                .from('files')
                                .select('*')
                                .eq('user_id', user.user_id);

                        if (filesError) {
                            console.error(
                                'Error fetching files for user:',
                                filesError.message
                            );
                            return user; // Return the user without files
                        }

                        // Add the 'files' property to the user object
                        user.files = files;

                        return user;
                    })
                );

                setUsers(usersWithFiles);
            } catch (error: any) {
                console.error('Error fetching users:', error.message);
            }
        }

        fetchUsers();
    }, []);

    // Function to fetch a file by ID
    const fetchUserById = async (user_id: number) => {
        try {
            const { data: user, error } = await supabase
                .from('users')
                .select('*')
                .eq('user_id', user_id)
                .single(); // Use single() to fetch a single record

            if (error) {
                throw error;
            }
            // Fetch files associated with the user
            const { data: files, error: filesError } = await supabase
                .from('files')
                .select('*')
                .eq('user_id', user.user_id);

            if (filesError) {
                console.error(
                    'Error fetching files for user:',
                    filesError.message
                );
                user.files = []; // Set an empty array for files if there's an error
            } else {
                // Add the 'files' property to the user object
                user.files = files;
            }
            return user;
        } catch (error: any) {
            console.error('Error fetching client by ID:', error.message);
        }
    };

    // Handle clicking on a file
    const handleUserClick = async (user_id: number) => {
        const user = await fetchUserById(user_id);
        if (user) {
            console.log('User Data', user);
            // window.location.href = `/file/${file.id}`;

            // router.push(`/file/${file.id}`); // Assuming you have a route for file details
        }
    };

    return (
        <LayoutComponent>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold mb-4">Users</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <div
                            key={user.user_id}
                            className="bg-white shadow-lg p-4 rounded-lg hover:shadow-xl transition duration-300"
                            onClick={() => handleUserClick(user.user_id)}
                        >
                            <h2 className="text-xl font-semibold mb-2">
                                {user.firstname} {user.lastname}
                            </h2>
                            <p className="text-gray-600">{user.email}</p>
                            <p className="text-gray-600">{user.phonenumber}</p>
                            {/* <p className="text-gray-600">{user.password}</p> */}
                        </div>
                    ))}
                </div>
            </div>
        </LayoutComponent>
    );
}
